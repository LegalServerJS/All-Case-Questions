# All-Case-Questions
## Overall

Collects all the case field questions and answers and puts them into a single text field during intake. This is useful if you need to populate a template with all the case field Q/A and don't want to map each one and don't want to create an individual template for each LPC code. Now that all the Q/A are stored in a single field you can simply add that field to your template and you're good to go regardless of LPC. The function that does this is added to the Save and Next button as a mousedown event. This way you don't have to try and guess when the user is done adding answers to the question.

We needed a well formatted template that we could print for pro bono attorneys with information about the client including all the questions and answers. The only way would be to create a separate template for each LPC with all the possible mapped questions that would have to be updated every time we added or removed a question. This way we only have to have one template for all LPC's and add this one field.

There are some limitations, like if you update a case question or answer after intake, the changes won't be reflected in the All Case Questions field.

![screenshot_case_questions](https://user-images.githubusercontent.com/7875591/35586813-e807a408-05c9-11e8-8105-a7cfcdcbb572.png)


## Steps

1) Create field call "All Case Questions" and make it a text area field.
2) Add this field to the page where your case questions are asked during intake.
3) Add the script from grabcasequestions.js to an instruction block. (Make sure treat as HTML is enabled)

## How it Works Detailed
When the page is loaded, the script waits 5 seconds for jQuery to load and then adds the matthew_Fill_Case_Questions() function as an event trigger to the Save and Next Button. When the person is done typing in the answers for the questions, and they hit Save and Next, the matthew_Fill_Case_Questions() will run. This function uses a recursive function to run through all of the children of the div tag with the class "matter_form_element_form_case_specific" which is going to be the case questions div. It looks for all label tags which are where the questions are stored and saves the text of the question. It also grabs the 'for' attribute of the label which is going to be the ID of the answer tag. The function checks to see what type of answer it is, radio button, free text, drop down etc, and will grab the answer. All of this is saved as a single string. The questions without answers are stripped out and the "All Case Questions" field is populated with the string.

## Warning
As always this is not supported by Legal Server. Depending on how you have your individual Legal Server set up, this may or may not work. Adding JavaScript can introduce bugs and potentially cause other issues. Please proceed only if you know what you're doing. We disclaim all liability if something goes wrong.
