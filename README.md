# Store Locator Website

## Overview

The Store Locator website is a web application created using Express.js, Mapbox, and MongoDB to help users easily locate nearby stores and access relevant information. The application allows users to view a map with store locations, explore store details, and even add new stores to the database.

![Store Locator](https://ramin.website/assets/images/projects/store-app.jpg)

## Features

- **Interactive Map:** The website provides an interactive map powered by Mapbox, allowing users to explore store locations visually.

- **Store Listings:** A list of store locations is displayed on the left side of the page, providing users with a quick overview of available stores.

- **Detailed Information:** Clicking on a store in the list or on the map displays detailed information about the selected store, including its name, address, and contact details.

- **Add New Stores:** Users can contribute to the database by adding new stores through the "Add Store" link.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running
- Mapbox API key (replace `'pk.eyJ1IjoicmFtaW45NjMiLCJhIjoiY2xtdnozcDJ5MHYwazJydnp5bGM5MDl0dyJ9.BugsfIKKdpJWUmvLZQaa6Q'` in `map.js` with your API key)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/store-locator.git
   ```

2. Install dependencies:

   ```bash
   cd store-locator
   npm install
   ```

3. Set up your environment variables:

   Create a `.env` file in the root directory and add the following:

   ```
   MONGODB_URI=your_mongodb_uri
   MAPBOX_API_KEY=your_mapbox_api_key
   ```

4. Run the application:

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:your_port`.

## Contributing

If you would like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Create a pull request.

## Acknowledgments

- Icons made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com/)
- Mapbox for providing the mapping platform

Feel free to customize this readme to better suit your project. Add more sections or details as needed.
