# TransitTracker Case Study

## Framework Version
- NPM Version: 10.2.4
- Node Version: 20.11.0
- React Version 19.0.0
- HTTP Request Lib: Axios

## Working Notes

### Day 1
- Took a look at https://www.metrotransit.org/ as a reference and the swagger endpoint at https://svc.metrotransit.org/swagger/index.html.
    - Seems like a pretty straight forward at how they handle the data. There is definitely some result passing from call to call.
    - Starting off with a basic UI. Don't see a point in building out another custom Node REST API as of now, data washing seems largely unnecessary in this case.
    - Honestly, MetroTransit does a lot of things very well already. Their initial drop down holds your hand through the process and the scheduling list is very clean. I will try and keep this functionality in my design.

- Chipping away are required requirements first, starting with a search bar

- Importing Tailwind CSS for web page styling - Just a personal choice

- First Steps:
    - Seeing if I can get a list of Stop options to auto populate on page entry and filter as user types into the input box
    - **Note**: Using GPT to generate stylings for me for first run. Probably not worth it for me to sit on CSS the entire time for the case study. Will add in my own touches towards the end.

- Mile Stone 1: Populated dropdown with the Routes Data:
![image](pictures\Milestone_1.PNG)