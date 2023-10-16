# WattSaver

WattSaver is an energy management app that can monitor, advise, and moderate our energy use wirelessly. Using our WattSaver app and a Wyze Smart Plug, you can review your energy usage over any timeframe you want and see live location-based charts of price per kilowatt-hour. If you notice unintentional energy consumption while you are away, you can wirelessly deactivate the smart plug and save on your energy bill. WattSaver also includes a chart with the sources of energy you would be using based on your time and location so you can use more energy from renewable sources.

# How we built it
Front-End Development: We chose React-Native to create WattSaver's user interface. With limited prior experience, we relied on tutorial videos to build the app from the ground up. The resulting interface met our vision for WattSaver, offering a user-friendly experience.

Back-End: We used NodeJS and Flask to create our backend. The first Flask server fetches data from our Wyze plug and writes the data to MongoDB. The second Flask server fetches data from Independent Electricity System Operator and stores it in MongoDB. Both these are stored as time series data to allow for future data manipulation. The NodeJS server allows the user to call our API endpoints to update and retrieve data. We containerized our backend to enable deployment to cloud in the future.

Hardware Integration: Our determination to have a useful and unique project led us to discover a compatible smart outlet, marking our first experience with physical components in a project. This successful integration taught us invaluable lessons about the synergy between software and hardware.
Challenges we ran into

# Challenges
During the planning phase, we explored numerous project ideas, and one concept that particularly resonated with us was WattSaver. However, our journey with WattSaver encountered its first hurdle when we procured hardware that proved to be incompatible with our system's energy usage tracking requirements. This hardware, initially only serving as a wireless on/off switch, left us contemplating a switch to an alternative project idea. Ultimately, we decided to persist with WattSaver, driven by our discovery of an appropriate smart outlet that would enable us to achieve our goals.

Yet, this was not the only significant challenge we faced. We embarked on the ambitious task of using React-Native for the first time, learning its intricacies on the fly. Initially, we grappled with the fundamental aspects of creating a homepage from scratch, including the complexities of crafting various elements and incorporating images seamlessly. The journey through React-Native was marked by syntax-related issues, and we often found ourselves delving into the intricacies of importing libraries for specialized functionalities, further enhancing the learning curve.

There were challenges with MongoDB, as we set the global whitelist to expire after a few hours. This resulted in requests working on only some machines. We also had difficulty with time zones, as we had multiple different sources of information.
Accomplishments that we're proud of

# Accomplishments
One achievement we're proud of is how we developed the system to track and analyze energy consumption trends over time. Our work provided users with valuable insights into their energy usage, a vital aspect of encouraging sustainable energy habits.

We excelled in handling the dynamic and hardware elements of WattSaver, particularly the successful integration of the smart outlet. This addition allowed users to remotely control their energy consumption, enhancing the app's practicality and user experience. Our expertise significantly contributed to WattSaver's impact.
What we learned

# What's next for WattSaver
In the future, we would like to use A.I. to analyze energy usage data and advise a more sustainable usage habit for the user without disrupting normal spending too much. Another feature we would like to include is an algorithm that will charge appliances during off-peak hours and disable power output once the equipment is fully charged. We would do this by analyzing usage data, taking into account user hours of availability and equipment category such as cellphones or electric vehicles, and plan the most effective time schedule for charging.

Here is the link to the documentation to the custom APIs:
https://documenter.getpostman.com/view/25806974/2s9YR58G11
