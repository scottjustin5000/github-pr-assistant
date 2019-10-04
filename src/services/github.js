const fetch = require('node-fetch')
const Promise = require('bluebird')
const graph = 'https://api.github.com/graphql'

const fetchIt = (token, query) => {
  return fetch(graph, {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(function (response) {
      return response.json()
    }).catch(er => console.error(er))
}

const getUserReviewRequest = (token, user) => {
  const query = `query{
    search(query: "type:pr state:open review-requested:${user}", type: ISSUE, first: 100) {
      issueCount
      pageInfo {
        endCursor
        startCursor
      }
      edges {
        node {
          ... on PullRequest {
            repository {
              nameWithOwner
            }
            number
            url
          }
        }
      }
    }
  }`
  return fetchIt(token, query)
}

const getUsers = (token, organization) => {
  const query = `
  {
    organization(login: "${organization}") {
      email
      membersWithRole(first: 100) {
        totalCount
        nodes {
          ... on User {
            login
            name
            avatarUrl
          }
        }
      }
    }
  }
  `
  return fetchIt(token, query)
}

const getOpenPullRequests = (token, organization) => {
  const query = `query{
    search(query: "is:open is:pr archived:false user:${organization}", type: ISSUE, first: 100) {
      issueCount
      pageInfo {
        endCursor
        startCursor
      }
      edges {
        node {
          ... on PullRequest {
            repository {
              nameWithOwner
            }
            author {
              login
            }
            number
            url
          }
        }
      }
    }
  }`
  return fetchIt(token, query)
}

const getUserStats = async (token, user, prs) => {
  const reviewRequests = await getUserReviewRequest(token, user.login)

  user.openPrs = prs || []

  if (reviewRequests) {
    user.reviewRequests = reviewRequests.data.search.edges
  }
  return user
}

const loadOrgPrStats = async (token, organization) => {
  let openPrs = 0
  return Promise.props({
    users: getUsers(token, organization),
    prs: getOpenPullRequests(token, organization)
  }).then((results) => {
    const users = results.users && results.users.data && results.users.data.organization
      ? results.users.data.organization.membersWithRole.nodes : []
    let prUserHashMap = {}
    openPrs = results && results.prs && results.prs.data.search && results.prs.data.search.issueCount
    if (openPrs) {
      results.prs.data.search.edges.reduce((memo, current) => {
        if (!prUserHashMap[current.node.author.login]) {
          prUserHashMap[current.node.author.login] = []
        }
        prUserHashMap[current.node.author.login].push(current.node.repository.nameWithOwner)
        return prUserHashMap
      }, prUserHashMap)
    }
    return Promise.map(users, (user) => { return getUserStats(token, user, prUserHashMap[user.login]) }, { concurrency: 3 })
  })
    .then((results) => {
      return (results || []).filter((f) => { return f.openPrs.length || f.reviewRequests.length }).sort((a, b) => (a.reviewRequests.length < b.reviewRequests.length) ? 1 : (a.reviewRequests.length === b.reviewRequests.length) ? ((a.openPrs.length < b.openPrs.length) ? 1 : -1) : -1)
    })
}

const Github = {
  loadOrgPrStats
}
export default Github
