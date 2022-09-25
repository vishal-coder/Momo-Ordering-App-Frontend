# [MomoKing](https://momoking.netlify.app/) - Website

  [Front End](https://github.com/vishal-coder/Momo-Ordering-App-Frontend)
  [Back End](https://github.com/vishal-coder/Momo-Ordering-App-Backend)

## Brief Description

- MomoKing website is a  online momo ordering website where user can view different varient of momos and order as per choice.
Once the payment through RazorPay payment Gateway is done admin gets notification about new order

- Admin can add new product as well as edit and delete exisitng product
- Admin can change the status of order 


Payment - RazorPay Payment gateway is used for Payment Purpose

### `Short tech summary`
  - Implemented authentication,authorization using Json Web Token for login,along with CRUD features.
  - Integrated payment gateway by RazorPay API to collect service and display transaction status.
  - Implemented [MongoDB ChangeStream](https://www.mongodb.com/docs/manual/changeStreams) for push notification to admin about payments
  


## Features

### `User features`
  - User can view momo list only after logging in 
  - User can add different momos to cart and can remote any or all momos from cart
  - Once payment is done order is confirmed and user can see latest status of order in my orders page  
  

### `Admin features`
  - Admin Can add new product/Momo
  - Edit or Delete exisitng product
  - Can update status of order
 
  
## Tech Used
  - ReactJS
  - ExpressJS
  - NodeJS
  - MongoDB and MongoDB ChangeStream
  - Socket.io - for Push Notification
  - RazorPay Payment Gateway for Payment Integration - Sharable Payments Link is used
