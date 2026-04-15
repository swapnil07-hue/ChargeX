const sampleListings = [
    {
        title: "GreenCharge EV Station",
        description: "A fast and reliable EV charging station with multiple ports and 24/7 availability.",
        image: "https://media.wired.com/photos/6650c3c556be637959104b4c/master/pass/How-Many-EV-Chargers-Do-We-Need--Gear-GettyImages-1242853407.jpg",
        city: "Goa",
        state: "Maharashtra",
        available_slots: 6,
        total_slots: 12,
        price_per_slot: 50 // Price in INR
    },
    {
        title: "ElectroHub Charging Point",
        description: "Conveniently located charging station with ultra-fast chargers for all EVs.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG5wzDY2GFKFHlTJgMP8hKJeO5GzIaCKHT6Q&s",
        city: "Chennai",
        state: "Karnataka",
        available_slots: 8,
        total_slots: 15,
        price_per_slot: 60
    },
    {
        title: "EV SmartCharge Station",
        description: "Affordable and accessible EV charging with real-time slot availability updates.",
        image: "https://www.loomsolar.com/cdn/shop/articles/how_many_ev_charging_stations_in_india_-_Loom_Solar.jpg?v=1675764644",
        city: "Nagpur",
        state: "Maharashtra",
        available_slots: 5,
        total_slots: 10,
        price_per_slot: 55
    },
    {
        title: "RapidCharge EV Hub",
        description: "A premium EV charging experience with fast-charging technology and easy navigation.",
        image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/171037/right-front-three-quarter0.jpeg?isig=0&wm=0",
        city: "Nashik",
        state: "Maharashtra",
        available_slots: 4,
        total_slots: 8,
        price_per_slot: 65
    },
    {
        title: "PowerBoost EV Station",
        description: "Charging your EV with renewable energy sources at an eco-friendly station.",
        image: "https://blog.evbox.com/hs-fs/hubfs/Screenshot%202022-11-18%20at%2013-34-40-png%20(1).jpg?width=1230&height=970&name=Screenshot%202022-11-18%20at%2013-34-40-png%20(1).jpg",
        city: "Mumbai",
        state: "Maharashtra",
        available_slots: 7,
        total_slots: 14,
        price_per_slot: 70
    },
    {
        title: "EcoCharge Hub",
        description: "An eco-friendly EV charging hub with solar-powered stations and fast-charging ports.",
        image: "https://imgd.aeplcdn.com/642x361/n/cw/ec/164625/right-front-three-quarter2.jpeg?isig=0&wm=0&q=75",
        city: "Pune",
        state: "Maharashtra",
        available_slots: 4,
        total_slots: 10,
        price_per_slot: 75
    },
    {
        title: "VoltMax Supercharge",
        description: "Ultra-fast EV charging with premium amenities like Wi-Fi and a lounge.",
        image: "https://www.jiobp.com/sites/default/files/2022-06/EV%20Charging_Fleet%20Charging%20Station_Inner%20page%20Image.png",
        city: "Bangalore",
        state: "Karnataka",
        available_slots: 2,
        total_slots: 8,
        price_per_slot: 80
    },
    {
        title: "RapidEV ChargePoint",
        description: "Reliable and efficient EV charging station with multiple high-speed chargers.",
        image: "https://www.shutterstock.com/shutterstock/photos/2496954321/display_1500/stock-photo-electric-vehicle-charging-stations-arranged-neatly-in-green-surroundings-during-daylight-hours-2496954321.jpg",
        city: "Hyderabad",
        state: "Telangana",
        available_slots: 7,
        total_slots: 14,
        price_per_slot: 85
    },
    {
        title: "ChargeEase Station",
        description: "User-friendly EV station with a seamless digital payment experience and 24/7 support.",
        image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/176713/tata-nexon-ev-right-side-view1.jpeg?isig=0",
        city: "Mumbai",
        state: "Maharashtra",
        available_slots: 5,
        total_slots: 15,
        price_per_slot: 60
    },
    {
        title: "PowerUp EV Hub",
        description: "Smart EV charging with AI-driven analytics for optimal energy usage and minimal wait times.",
        image: "https://www.shutterstock.com/image-illustration/3d-rendering-group-ev-charging-260nw-2529542883.jpg",
        city: "Delhi",
        state: "Delhi",
        available_slots: 3,
        total_slots: 9,
        price_per_slot: 95
    },
    {
        title: "MSEDCL EV Charging Station - Kalamna Substation",
        description: "A reliable EV charging station operated by Maharashtra State Electricity Distribution Company Limited (MSEDCL), strategically located at the Kalamna Substation to serve the Nagpur region.",
        image: "https://www.thehitavada.com/Encyc/2022/6/23/charging-stations_202206230646439434_H@@IGHT_300_W@@IDTH_500.jpg",
        city: "Nagpur",
        state: "Maharashtra",
        available_slots: 4,
        total_slots: 8,
        price_per_slot: 50
    },
    {
        title: "MSEDCL EV Charging Station - Mayo Substation",
        description: "MSEDCL's EV charging facility situated at the Mayo Substation, offering efficient charging services to electric vehicle users in Nagpur.",
        image: "https://images.indianexpress.com/2024/04/EV_b6d409.jpg",
        city: "Nagpur",
        state: "Maharashtra",
        available_slots: 3,
        total_slots: 6,
        price_per_slot: 55
    }
  ];
  
  module.exports = { data: sampleListings };
  