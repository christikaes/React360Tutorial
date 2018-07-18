# React360 Tutorial

In this tutorial, we will create a simple WebVR application with React360.

You can read more about React360 here: https://facebook.github.io/react-360/
```
React 360 is a framework for the creation of 3D and VR user interfaces. Built on top of React – a library designed to simplify the creation of complex UI – React 360 allows you to use familiar tools and concepts to create immersive 360 content on the web.
```

Ready? Let's get started!

## Prereqs
* Some knowledge of react
* Chrome
* npm

## [Part0] Init

Go ahead and clone the repo (Checkout branch Part0) and run `npm install` to get yout app setup.
Alternatively install the react 360 cli and create a new project:
```
npm install -g react-360-cli
react-360 init Hello360
```
When you run `npm start` in the project directory you should be able to see the base project running!

## [Part1] Add Assets

Here we just added some assets to be used in the app. Checkout the blender tutorial to see how those assets were generated.

## [Part2] Simple Updates

The React360 project starts in the `index.html` file. The initialization script attaches React360 to a div on the page:
```
React360.init(
    'index.bundle?platform=vr&dev=true',
    document.getElementById('container'),
    {
        assetRoot: 'static_assets/',
    }
);
```

After that the `client.js` file is used. This file is where the different views of the application are initialized. You can see that as:
```
 r360.renderToSurface(
    r360.createRoot('react360', { /* initial props */ }),
    r360.getDefaultSurface()
  );
```

This creates a root for the react360 component which is setup in `index.js`. In the `index.js` file, the react360 surface is created and views are added to it. Just like in react this uses JSX in order to compose components. Our scene currently looks like:
```
<View style={styles.panel}>
    <View style={styles.greetingBox}>
        <Text style={styles.greeting}>
        Welcome to React 360
        </Text>
    </View>
</View>
```
Go ahead and update the text inside of the `Text` component. When you refresh the page you should see your changes!
You can also play around with the `styles.greeting` object to modify how the text appears.

React360 has 5 main components:
* View
* Text
* Image
* Entity
* VrButton

## [Part3] Create Panel Component

What makes React360 powerful is that you can compose components together to build a complex application. In this section lets separate out the panel components into it's own class. (In the next section we will add a Model component)

First create a file `Panel.js` and copy over all of the contents from `index.js`. Remove the AppRegistry that happens at the end of the file, we will leave this in index.js.

Second clean up index.js - this will help us scale our app. Remove everything that was copied over to the Panel component. Go ahead and import the Panel component and register it here. Your index.js should look like: 
```
import React from 'react';
import Panel from './Panel';

import {
  AppRegistry
} from 'react-360';

AppRegistry.registerComponent('Panel', () => Panel);
```

Lastly in `client.js` modify the root creation to usethe new Panel component (insetead of react360):
```
r360.renderToSurface(
    r360.createRoot('Panel', { /* initial props */ }),
    r360.getDefaultSurface()
);
```

Awesome! We are now all setup to scale out our application by adding another component.

## [Part4] Create Model Component

So far our app just has a flat panel on it. Here we will create a 3d Model and add it to our app.

First go ahead and create a new file `Model.js`. In here we will create a 3dModel entity.
Copy the base setup from Panel.js for reference. In our `View`, add two components: `AmbientLight` and `Entity` 
```
<View>
    <AmbientLight intensity={5} />
    <Entity source={{ obj: asset('r2d2.obj'), mtl: asset('r2d2.mtl') }}
        lit={true}
        style={{ transform: [{ rotateY: 60 }] }}
    />
</View>
```
When you create an entity you can specify the source model with - obj (object) and mtl (material). You can also specify that it is lit so that the object is bright. Furthermore, you can specify styles such as translate or transform on the model. 

Second let's add this to our `index.js`. Just like you did with Panel, go ahead and import the Model component. Then Register the component:
```
AppRegistry.registerComponent('Model', () => Model);
```

Lastly let's include this in our `client.js` file:
```
// Render the model to the location
const location = new Location([0, -3, -8]);
r360.renderToLocation(
    r360.createRoot('Model', { /* initial props */ }),
    location
);
```
Like with the surface component we are using `createRoot` to hookup the Model component, and we are also specifying a location (instead of using the default)

Awesome! When you reload the page you should see our R2D2 model right there!

## [Part5] Add Sound

Let's add a button that when clicked plays a sound. We will add this to our Panel component.

In the panel component go ahead and add a `vrButton` to the view. Also set the `onClick` attribute to play a sound:
```
<VrButton
    onClick={() => {
        AudioModule.playOneShot({
            source: asset('r2d2.mp3'),
        });
    }}>
    <Text>
        Play Message
    </Text>
</VrButton>
```

The AudioModule comes from NativeModules `const { AudioModule } = NativeModules;` (which is imported from react360). React360 provides all the reactNative modules for you to use in your app!

Now when you run the app you can click the button to play the message!

## [Part6] Edit Sky

Lastly let's go ahead and change the sky. Right now it is using the defaul image, instead let's use a custom image. You will need an equirectangular panorama for this (provided in the assets folder). All that you need to change is in `client.js`:
```
r360.compositor.setBackground(r360.getAssetURL('sky.jpg'));
```
Update the asset url to match your file name.

All done!