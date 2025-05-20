/**
 * Extracts the Twitter username from a tweet URL
 * @param url The tweet URL
 * @returns The Twitter username or null if not found
 */
export function extractTwitterUsername(url: string): string | null {
  try {
    // Handle both twitter.com and x.com URLs
    const regex = /(?:twitter\.com|x\.com)\/([^/]+)/i
    const match = url.match(regex)

    if (match && match[1] && !["i", "intent", "share", "status"].includes(match[1])) {
      return match[1]
    }

    return null
  } catch (error) {
    console.error("Error extracting Twitter username:", error)
    return null
  }
}

/**
 * Extracts the tweet ID from a tweet URL
 * @param url The tweet URL
 * @returns The tweet ID or null if not found
 */
export function extractTweetId(url: string): string | null {
  try {
    // Handle both twitter.com and x.com URLs
    const regex = /(?:twitter\.com|x\.com)\/[^/]+\/status\/(\d+)/i
    const match = url.match(regex)

    if (match && match[1]) {
      return match[1]
    }

    return null
  } catch (error) {
    console.error("Error extracting tweet ID:", error)
    return null
  }
}
