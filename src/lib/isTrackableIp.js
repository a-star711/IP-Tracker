export const isTrackableIp = (ip) =>  {
  const validIpFormatRegex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
  if(!validIpFormatRegex.test(ip)) {
    return false;
  }

  const [firstOctet] = ip.split('.').map(Number)

  return firstOctet < 224 || firstOctet > 239;
}