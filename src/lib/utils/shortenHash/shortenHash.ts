const shortenHash = (hash: string) =>
  hash.length < 19 ? hash : `${hash.slice(0, 8)}...${hash.slice(-8)}`;

export default shortenHash;
