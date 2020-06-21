const logger = (label, ...payloads) => {
  console.group(label);
  payloads.forEach((p) => {
    console.log(p);
  });
  console.groupEnd();
};

export default logger;
