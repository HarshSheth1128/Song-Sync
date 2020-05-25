# Song-Sync
A javascript monorepo application which allows users to sync playlists from spotify to apple music

## What is this application
I designed this application in order to solve the problem of terrible Apple Music curation. For many genre's of music, Spotify provides free curated playlists for users. As of now on quality solution exists to regularly sync songs between platforms.
It is my hope that Song-Sync can fill this void.

## Screenshots
Here are some screenshots of the application in development

![Splash page](https://i.imgur.com/rMsFE5q.png "Splash Page")

![Main page](https://i.imgur.com/W0CC38g.png "Main Page")

![Main page empty] (https://i.imgur.com/uoDTkQg.png "Main Page Empty")

## Tech Stack

### Front-end
I am using React on the frontend with sass to preprocess the CSS.

### Back-end
On the backend we're using Express and a MySQL database. The databse will be hosted using a service like Amazon RDS.

### Hosting
I plan on hosting this application on AWS, primarily because it is cheap and reliable 

### Containerization
To aid in the development of this application, each part of the app is containerized and separated on its concerns. This allows me to spin up the app quickly without configuring my environment everytime.
By using a monorepo architecture, all source code lies in one app repo, which makes maintenance of individual components easier to handle
