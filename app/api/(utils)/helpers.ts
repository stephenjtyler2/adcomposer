export function getDomainNameFromHostName(hostname: string) {
    let clientHost = hostname;
    // strip off port if present...
    if (clientHost && clientHost.indexOf(":") > -1) {
        clientHost = clientHost.split(":")[0];
    }
    return clientHost;
}