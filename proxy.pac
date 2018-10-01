function FindProxyForURL(url, host) {
// If the hostname matches, send direct.
if (dnsDomainIs(host, "proxy.delaware.gov") ||
    dnsDomainIs(host, "access.delaware.gov") ||
    dnsDomainIs(host, "eduproxy.delaware.gov") ||
    dnsDomainIs(host, ".doesis.uat") ||
    dnsDomainIs(host, ".drc-centraloffice.com") ||
    dnsDomainIs(host, ".doesis.pas")){
    return "DIRECT";
    }
// Smarter Balanced Assessment Consortium - AIR
if (dnsDomainIs(host, ".airast.org") ||
    shExpMatch(host, "media.merriam-webster.com") ||
    shExpMatch(host, "www.dictionaryapi.com")) {
    return "DIRECT";
    }
if (shExpMatch(host, "*.goguardian.com") {
    return "PROXY 127.0.0.1:8106";
    }
//Proxy for all .com TLD. skip unnecessary tests
if (shExpMatch(host, "*.com"))
      return "PROXY biggs.eduproxy.delaware.gov:8080; PROXY 167.21.140.40:8080; PROXY 167.21.40.40:8080";
//If might be direct do lookup
//Unfortunately not all browsers support regex to check for only decimal digits.
//The best we can do is pattern matching of strings containing numbers and decimal points.
//Sites such as tomcat.10.x6.nabble.com will match, but are rare. dnsResolve and isInNet
//will determine if it should go DIRECT. All functions are necessary.
//dnsResolve does not perform a DNS query if host is an IP address.
if (shExpMatch(host, "10.*.*.*") ||
    shExpMatch(host, "172.*.*.*") ||
    shExpMatch(host, "*.k12.de.us") ||
    shExpMatch(host, "*.state.de.us") ||
    shExpMatch(host, "*.cricut.io") ||
    shExpMatch(host, "*.cricut.com") ||
    shExpMatch(host, "*.dataservice.org") ||
    shExpMatch(host, "192.168.*.*") ||
    shExpMatch(host, "100.*.*.*") ||
    shExpMatch(host, "127.*.*.*")){
    var resolved_ip = dnsResolve(host);
    if (isInNet(resolved_ip, "172.16.0.0", "255.240.0.0") ||
        isInNet(resolved_ip, "10.0.0.0", "255.0.0.0") ||
        isInNet(resolved_ip, "192.168.0.0",  "255.255.0.0") ||
        isInNet(resolved_ip, "100.64.0.0",  "255.192.0.0") ||
        isInNet(resolved_ip, "127.0.0.0", "255.255.0.0")) {
        return "DIRECT";
        }
    }
//If the requested website is hosted within the internal network, send direct
  if (isPlainHostName(host) ||
    shExpMatch(host, "*.localhost") ||
    shExpMatch(host, "localhost.") ||
    shExpMatch(host, "*.local")) {
    return "DIRECT";
    }
// DEFAULT RULE: All other traffic, use below proxies, in fail-over order
  return "PROXY biggs.eduproxy.delaware.gov:8080; PROXY 167.21.140.40:8080; PROXY 167.21.40.40:8080";
}
