export const currentStream = (streamList ,payload) => {
  console.log(streamList , payload);
 const streamIndex =  streamList.findIndex((stream) => {
    return stream._id === payload;
  });
  console.log(streamIndex);
  return streamIndex;
};

