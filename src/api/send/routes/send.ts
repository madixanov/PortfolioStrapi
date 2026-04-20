export default {
  routes: [
    {
      method: "POST",
      path: "/send",
      handler: "send.send",
      config: {
        auth: false,
      },
    },
  ],
};