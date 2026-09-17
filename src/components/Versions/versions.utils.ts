export const VersionsUtil = {
    prometheiVersion: () => import.meta.env.PACKAGE_VERSION,

    clientVersion: (version: string | undefined) => {
        const parts = version?.split("\n") || [""];
        return parts[parts.length - 1];
    }
}