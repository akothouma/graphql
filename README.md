 # GraphQL Profile Page

A project to learn and demonstrate the use of the GraphQL query language. This application features a secure login page and a dynamic user profile page that fetches and visualizes data from the Zone01 Kisumu GraphQL API.



## Table of Contents

    About The Project

    Features

    Built With

    Getting Started

        Prerequisites

        Installation

    Usage

    API Endpoints

        Authentication

        GraphQL

    GraphQL Query Examples

    Project Structure

    
About The Project

The primary objective of this project is to gain practical experience with GraphQL. By building a personal profile page, we interact with a real-world GraphQL API to fetch user-specific data and display it in a meaningful way.

The project is divided into two main parts:

    A secure login system to authenticate the user and obtain a JSON Web Token (JWT).

    A profile page that uses the JWT to make authenticated GraphQL queries, retrieving and displaying user information and statistics.

A key requirement is the creation of at least two statistical graphs rendered dynamically using SVG, without relying on external charting libraries.
Features

    Secure User Login:

        Authenticates against the /api/auth/signin endpoint.

        Supports both username:password and email:password credentials.

        Uses Basic Authentication (Base64 encoded).

        Displays clear error messages for invalid credentials.

    JWT Management:

        Stores the JWT securely upon successful login.

        Uses the JWT as a Bearer Token for all GraphQL API requests.

    User Profile Display:

        Displays at three pieces of user information, such as:

            Basic user identification (login, name, etc.).

            Total XP amount.

            Recent grades or project results.

            Audit statistics.

            

    Dynamic SVG Graphs:

        A mandatory statistics section with at least two different graphs generated using SVG.

        Example graphs:

            XP earned by project.

            Grade progression of the projects

    Logout Functionality:

        A clear method to log out, which invalidates the session and returns the user to the login page.

## Built With

This project is built with front-end web technologies, focusing on core languages rather than frameworks to emphasize the fundamentals.

    HTML5

    CSS3

    Vanilla JavaScript

    SVG (Scalable Vector Graphics) for data visualization

    GraphQL as the query language

## Getting Started

To get a local copy up and running, follow these simple steps.
Prerequisites

You only need a modern web browser that supports JavaScript (e.g., Chrome, Firefox, Safari, Edge).
Installation

    Clone the repository to your local machine
```git clone https://learn.zone01kisumu.ke/git/lakoth/graphql```
        

Navigate to the project directory:
      
```cd graphql```

    



    

   run the command 
   ```npx serve -s . -l 8000``` or at any port of your choice

## Usage

    Login: Open the application in your browser. You will be presented with the login page. Enter your Zone01 Kisumu username and password (or email and password).

    View Profile: Upon successful login, you will be redirected to your profile page. Here you will see your personal information and the statistical graphs.

    Logout: Click the "Logout" button to clear your session data and return to the login page.

## API Endpoints

This project interacts with two main API endpoints provided by the platform.
1. Authentication - Signin

This endpoint provides a JWT upon successful authentication.

    URL: https://learn.zone01kisumu.ke/api/auth/signin

    Method: POST

    Headers:

        Authorization: Basic <credentials>

            The <credentials> part is a Base64 encoded string of username:password or email:password.

           

    Body: Empty

    Success Response (200 OK): A JSON Web Token (JWT) as a plain text string.

    Error Response (401 Unauthorized): An error object if credentials are invalid.

2. GraphQL - Data Querying

This is the main endpoint for fetching all user data.

    URL: https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql

    Method: POST

    Headers:

        Authorization: Bearer <jwt>

            The <jwt> is the token received from the signin endpoint.

        Content-Type: application/json

    Body: A JSON object containing your GraphQL query.
    Generated json

          
    {
      "query": "query { user { id login } }"
    }

    Response: A JSON object containing the data requested in the data field.

## GraphQL Query Examples

Here are some example queries you can use to fetch data for your profile page.
<details>
<summary><strong>Fetch Basic User Info</strong></summary>
Generated graphql

      
query {
  user {
    id
    login
    firstName
    lastName
    campus
  }
}

    
</details>


Project Structure

The file structure for this project:

```
GRAPHQL/
├── index.html         # A SPA that toggles between pages that will be rendered,either Login or profile

├── css/
│   ├── style.css      # Main stylesheet
│   
├── js/
│   ├── auth.js       # Handles login logic and redirection
│   ├── profile.js     # Fetches data and builds the profile page
│   └── svg.js         # Functions to generate SVG graphs   
    ├── error.js       # Handles error display for good UX
│   ├── constants.js   #Holds the endpoints link and the query string
│   └── projects.js         # Functions to generate SVG  projects bar graphs
    └── progress.js         # Functions to generate SVG  grade progress graphs
    └── query.js         # fetches information from the graphql endpoint
└── README.md
```
    


