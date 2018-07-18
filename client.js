// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Surface, Location } from 'react-360-web';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });

  // Render your app content to a new flat surface
  const surface = new Surface(300, 600, Surface.SurfaceShape.Flat);
  surface.setAngle(-0.6, 0);
  r360.renderToSurface(
    r360.createRoot('Panel', { /* initial props */ }),
    surface
  );

  // Render the model to the location
  const location = new Location([0, -3, -8]);
  r360.renderToLocation(
    r360.createRoot('Model', { /* initial props */ }),
    location
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('sky.jpg'));
}

window.React360 = { init };
