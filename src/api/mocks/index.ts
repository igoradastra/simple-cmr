async function initMocks() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./browser');
    return worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
  return Promise.resolve();
}

initMocks();
