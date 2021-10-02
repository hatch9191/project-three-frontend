# GA Project Three - AirStudio
---
## Table of Contents

- Project Overview
- The Brief
- Technologies Used
- Code Installation
- Project Timeline
- Challenges
- Wins
- Bugs
- Future Improvements
- Key Learnings

## Project Overview

This was the first of the more ambitious projects on the GA course. This was also the first time I was working in a team of 3. It didn’t take long for us to agree on the concept of some sort of Airbnb clone, but with a slightly different spin on it. We came up with the idea of recording-studios as we felt there was a good chance to create models with interesting data and some good relationships between the models.

Please feel free to create your own account or login using the following credentials:

- email - harry@email.com
- password - pass

You can view the deployed project [HERE](https://bit.ly/3zP1Qtb).

### Project Members

- Christian Baker - https://github.com/Majoggy 
- Eoin Barr - https://github.com/eoin-barr 

<p align="center">
  <img src="https://res.cloudinary.com/dn11uqgux/image/upload/v1633175281/project-setup-test/airstudio_svpmat.png" />
</p>

## The Brief

- Build a full-stack application by making your own backend and your own frontend.
- Use an Express API to serve your data from a Mongo database.
- Consume your API with a separate frontend built with React.
- Be a complete product with multiple relationships and CRUD functionality for at least a couple of models.
- Implement thoughtful user stories/wireframes.
- Be deployed online so it's publicly accessible.

## Technologies Used

### Backend
- Node.js
- MongoDB
- Mongoose
- Express
- Bcrypt
- JSON Web Token
- MongoDB Compass & Atlas

### Frontend
- React
- JSX
- Axios
- Bootstrap
- SCSS
- React Bootstrap
- React Router Dom
- React Mapbox GL
- React Cloudinary Upload Widget
- React Select
- React Geocode

### Dev Tools
- Visual Studio Code (with Live Share)
- npm
- Insomnia
- Git
- Github
- Firefox Developer Edition
- Excalidraw (Wireframing)
- Netlify (Frontend Deployment)
- Heroku (Backend Deployment)

## Code Installation

- Install dependencies in both client and server folders using `npm i`
- Start the database `mongod --dbpath ~/data/db`
- To seed the database, in the server folder use `npm run seed`
- In the server folder, run the server using with `npm run dev`
- In the client folder, run the frontend with  `npm run dev`

## Project Timeline

### Day 1-2 - Bootstrap Exploration, Planning & Backend Setup

We started off the project with discussion on some of the ideas and technologies we wanted to use. We were given free reign on what sort of CSS framework we would like to use (if any). We agreed that Bootstrap would be a good option as its widely used across the industry. As none of us had used it before I suggested that we spend half an hour or so playing around with it and reading the docs to double check if it would be a suitable tool to learn and use in the timeframe we had. This was a really good task as it settled the nerves and gave us a chance to come up with some initial styling concepts before we started the wireframes (see images below) and planning lists. 

<p align="center">
  <img src="https://res.cloudinary.com/dn11uqgux/image/upload/v1633176045/project-setup-test/Screenshot_2021-10-01_at_16.15.30_aenilo.png" />
</p>
<p align="center">
  <img src="https://res.cloudinary.com/dn11uqgux/image/upload/v1633176050/project-setup-test/Screenshot_2021-10-01_at_16.16.31_yqmfgv.png" />
</p>

We worked as a group to set up the backend, taking it in turns to write out code whilst the others suggested the next lines and checked for any mistakes. This was a slow but methodical way of producing the backend but worth getting right to save time in the long run. We thought carefully through our concept and decided we would definitely need 2 models, Users and Studios. We were unsure whether we would need a third, Bookings. After some trial and error we settled on making it into a nested schema for the Studio model but knew that this would likely cause some issues down the line. 

### Day 3 - API Testing, Initial Functionality and Style Guidelines

Whilst we were building out the profileShow controller (see code below) we had an idea that we might have an ‘inception’ issue with the way our virtual fields were working. On testing it was clear that the way we were serving up the data to the frontend was not optimal. There is more on this in the ‘Challenges’ section further down.

```javascript 
async function profileShow(req, res, next) {
 const { currentUserId } = req
 try {
   const user = await User.findById(currentUserId)
     .populate('favouritedStudio')
     .populate('addedStudio')
     .populate('bookedStudio')
   if (!user) throw new NotFound()
   return res.status(200).json(user)
 } catch (err) {
   next(err)
 }
}
```

We ended up spending considerable time thinking of ways to work around this but with our level of knowledge at this point we weren’t able to come up with a satisfactory outcome so decided to move on.

Although we had tested our responses as we were going through the backend build process, we were still excited to see those responses transformed into usable data in a working frontend environment. Once we were able to map our studios out on the homepage we felt confident that our hard work on the server-side was successful. 

Overnight I had built out close-to-finished versions of the Navbar and Footer and found a logo that I thought would work nicely for the website. We used these and other ideas from our workings on day 1 to inform our styling for the site going forward. I felt it was an important step for all of us to be on the same page about our styling decisions early on so that when we divided up the workload and went our own ways to build different components we came back together with code that needed as little intervention as possible to make the site look cohesive. We agreed that we would check-in a couple of times a day to discuss what we had been working on then merge our code.

### Day 4-6 - User Profile Page, Deactivating Users & Favourting

Some of my main tasks were to set up the Register and Login pages and build out the Profile page. The Profile page was fun as it incorporated elements from both of my teammates (such as the Studio cards and the link to list a Studio) as well as making good use of most of the fields from the User data. 

As I was building out the Profile page I was playing with the idea of adding a deactivation function for users. This was not a part of the initial plan so it required me to go back into the server code and edit a couple of the fields’ parameters on the User model. I thought that an efficient way of handling this function would be to edit the user information in the frontend rather than creating a delete user controller in the backend. In this way it would avoid any knock on effects when trying to show any information on the site which had that user as its owner.  

```javascript
  React.useEffect(() => {
   const getData = async () => {
     try {
       const response = await profileUser(userId)
       setUser(response.data)
       setDeactivateData({
         username: `deactivatedUser${user._id}`,
         email: `deactivatedUser${user._id}@email.com`,
         password: 'recoveryPassword',
         passwordConfirmation: 'recoveryPassword',
         avatar: '',
       })
     } catch (err) {
       console.log(err)
       setIsError(true)
     }
   }
   getData()
 }, [userId, user._id, setUser])
 
 const handleDeactivate = async () => {
   try {
     const { data } = await editUser(userId, deactivateData)
     removeToken()
     history.push('/')
     console.log(data)
   } catch (err) {
     console.log(err.response.data.errors)
   }
 }
```

We had also built out a Favourite function (see code below) but hadn’t thought too much about how to implement it. I took on the task of building this after Eoin had finished the Studio detail page. On the face of it this wasn’t a particularly tricky request to make to the API, however I was keen to have a Favourite ticker in the Navbar whilst the Studio detail pages also needed to check if the currently logged in user had already favourited the studio yet. This was a really good challenge as it involved passing state between numerous components and also meant adding in a number of extra API requests at various levels. I was initially unsure if I should be making too many requests to the backend but after some research and consultation I was assured that the number of requests I was making was very minor. 

```javascript
 const handleFavourite = async () => {
   try {
     const res = await studioFavourited(studioId)
     console.log(res)
     const studioResponse = await getSingleStudio(studioId)
     setStudio(studioResponse.data)
     const profileResponse = await profileUser(user._id)
     setUser(profileResponse.data)
   } catch (err) {
     console.log(err)
     setIsError(true)
   }
 }
 
<>
{!studio.favouritedBy.some(favourite => favourite._id === user._id) && loggedIn && (
                 <Button
                   className="full-height fav-btn"
                   variant="dark"
                   onClick={handleFavourite}>
                   🤍 Add To Favourites</Button>
               )}
               {studio.favouritedBy.some(favourite => favourite._id === user._id) && loggedIn && (
                 <Button
                   className="full-height fav-btn"
                   variant="secondary"
                   onClick={handleFavourite}>
                   ♥️ Favourited</Button>
               )}
</>
```

### Day 7-8 Testing, Seeding and Polishing Off

We ended up making extremely good progress through our list of goals so by day 7 we were in a position to think about doing a full run through of the user-journey and from there check if any changes needed to be made.

The most that needed to be done is bringing together some uniformity on a couple of styling elements, like the parallax effect on our hero images and finding better quality images where needed, as well as double checking the environmental keys were working on all our machines for the dependencies. 

Until this point we had been working with only 3 studio entries on our database. As we had agreed no more changes needed to be made to our code on the backend, we cracked on with the seeding file and created some users and comments to bring the site to life. 

## Challenges

- Easily the biggest challenge was with our booking information for the user. We felt that a virtual field would be the best way with our knowledge to serve up this information (see code below) but struggled to isolate the user information for the response. You can see the commented out lines where we were having the problems accessing the information we wanted. My main issue on how the data was sent is more from a security point of view, rather than a slightly tricky to access and filter response (which it also was). The bookedStudio field for the User model is sent as an array of the Studios you have booked, but in order to access your booking information (such as dates/booking id)  you have to search through all the other bookings for that particular studio, which includes sensitive data from other users.

```javascript
userSchema
 .virtual('bookedStudio', {
   ref: 'Studio',
   localField: '_id',
   foreignField: 'bookings.bookedBy',
 })
 
 .get(function (bookedStudio) {
   if (!bookedStudio) return
   return bookedStudio.map(studio => {
     return {
       studioId: studio._id,
       name: studio.name,
       mainImage: studio.mainImage,
       location: {
         town: studio.location.town,
       },
       country: studio.location.country,
       // bookedFrom: studio.bookings.bookedFrom,
       // bookedTo: studio.bookings.bookedTo,
       bookings: studio.bookings,
     }
   })
 })
```

## Wins

- Our accuracy in sticking to our plans and recreating our wireframes was impressive. Most of the pages ended up being exact recreations and there were only a few changes across the site.
- We were very happy with our productivity. Due to our lack of experience, at the start we were unsure how ambitious our plans were. We put in a lot of hours at the start of the project to ensure we hit our target of having all our core goals completed by day 5 so that on day 6 we could think about our stretch goals. We ended up hitting all our deadlines and it meant the testing process could be thorough before deployment. 
- Using MongoDB was extremely helpful for its ease of manipulation after we had finished our initial build. We regularly made changes and additions to our database structure without any annoying knock-on effects or reseeding tasks. This was extremely helpful on a first-time build.   

## Bugs

- After deploying the site it was noted by some users that there is any issue accessing the Navbar buttons from the detailed Studio page. Having reviewed the code I haven’t been able to find any reason for this. My presumption is that a plugin or dependency is causing this. 

## Future Improvements

- I would set user, loggedIn and studios states at the App level so they can be loaded up immediately on entering the site, rather than just from the homepage. This would be more efficient if a user left the site then came back to a page that wasn’t the homepage.
- The booking process is currently only a bare facsimile of a booking process. It would be cool to implement some more steps in the process or even a cart, even if we didn’t create a payment process.
- Due to our inexperience we used a heavy mix of Bootstrap  and React-Bootstrap for our styling without guidelines on when best to use specific elements. Although perfectly functional, this has meant the code doesn’t quite have the professional quality harmony that I would personally like to see. 

## Key Learnings

This was a really fantastic experience on so many fronts. Having an opportunity to build a project on a much greater scale than I had before was exciting, whilst researching and using many new technologies was also very informative. 

By far the best takeaway from this was how to work on a large project like this as a part of a team. We took the planning phase very seriously to ensure everyone was mentally on the same page and then had, at a minimum, twice daily briefings to keep everyone up-to-date and troubleshoot any issues as a group. 

