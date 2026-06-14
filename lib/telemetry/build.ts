export function getBuildSha(): string {
  const sha =
    process.env.VERCEL_GIT_COMMIT_SHA ??
    process.env.NEXT_PUBLIC_BUILD_SHA ??
    "local"

  return sha === "local" ? sha : sha.slice(0, 7)
}
