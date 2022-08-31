import { gt, satisfies } from 'semver';

export const getLatestVersion = async (
  baseVersion: string,
  versions: string[],
) => {
  versions = versions
    .filter((version) => satisfies(version, '^' + baseVersion))
    .sort((a, b: string) => gt(b, a) as any);
  return versions[0];
};
