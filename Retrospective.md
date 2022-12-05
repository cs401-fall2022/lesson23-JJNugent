# Retrospective

- name: JJ Nugent
- email: johnathannugent@u.boisestate.edu

## Instructions

For the **Experience** section you need to detail your experience with this lab. 

- Were there any things that you struggled with? 
- Were there any parts of this lab that were unclear or poorly specified? 
- Were you able to get the entire project done?

For the **Known issues or Bugs** section you need to detail any issues or bugs that you have in your
code. For example maybe your code crashes randomly and you couldn't figure out why. If your code
doesn't have any issues you can simply write NONE in this section.

For the **Sources used** section you must detail any sources you used outside of the textbook or
course website. If you write NONE in this section it is assumed that you didn't use google at all.
Be safe CITE!

## Experience

There was a learning curve with this final project that was extremely rewarding to come out on top of. Before this lab we had't worked a whole lot with full stack applications, so an entire application with HTML, CSS, and JS on the front and back end was extremely challenging. There were design decisions to be made--SQL versus MongoDB, single page applications versus navigation, etc. It was difficult to put together at first. The most difficult part, for me, was configuring the mongoDB and learning how to make requests from the front end without navigating to a new page. To get this to work, I ended up making a custom router that would inject HTML templates to my application, and also handle requests to the backend using fetch. Once I had figured out how to do this, the rest of the assignment moved with a smooth flow.

I did end up abandoning two ideas from my original design - the first was a toggleable UI. The application really isn't usable without the UI visible, so I decided making it toggleable didn't really make sense for the user experience. The second was authentication - I wanted to implement this, but the time it took figuring out the base functionality was too much.

The instructions were clear enough - It didn't really specify any of the implementation details (besides no frameworks), but I think that was the point.

I was able to complete this project :)

## Known issues or Bugs

I didn't sanitize input on any of the forms, so it should be really easy to do all sorts of nasty things.

## Sources used

Class textbook for javascript reference

MongoDB, Express, React, and Node Todo tutorial - really helpful for configuring the backend https://www.youtube.com/watch?v=PvMDWbAPPK4&t=1065s&ab_channel=TheBraveCoders

Single Page Vanilla JS Application - helpful for figuring out navigation https://www.youtube.com/watch?v=OstALBk-jTc&ab_channel=dcode 
