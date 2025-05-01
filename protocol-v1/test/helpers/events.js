async function getEventObject(transaction, eventName) {
  const receipt = await transaction.wait();
  const events = receipt.events.filter((v) => {
    return v.event === eventName;
  });
  let eventObj;
  if (events.length > 0) eventObj = events[0].args;
  return eventObj;
}

module.exports = {
  getEventObject,
};
