<script>
/*
This code will attach a mousedown event trigger to the Save and Next button. The function that runs collects all of the case 
questions and answers as a single string. It then populates a newly added text field which I've called All Case Questions.
See the Readme for more.

I use the prefix matthew_ on all functions and global variables so I don't conflict with a LS function/variable of the same name.
This code should be embedded on your intake page where you ask and answer your core case questions.
*/

var matthew_qa =""; //This holds all of the case questions and answers.

setTimeout(function(){
	/*
	This waits 5 seconds. This is so jQuery has a chance to load.
  You could add it using javascript so it is added right away but then the rest of it would have to be built in javascript.
	It adds an mousedown event trigger to the "Save and Next Button" to run my matthew_Fill_Case_Questions function.
	*/
	
	//Get the submit button id. Note we search by name and value since in theory there could be multiple buttons
	var matthew_submit_button_id = jQuery("input[name='submit_button'][value='Save & Next']").attr("id");
	console.log("Submit Button ID: " + matthew_submit_button_id);

	//This sets an event trigger to the next button to run the case question field function
	jQuery('#'+matthew_submit_button_id).mousedown(matthew_Fill_Case_Questions);
},5000);

function matthew_Fill_Case_Questions(){
	//Grabs all the questions in the case fields div and gets the answer then populates the All Case Questions
	
  matthew_qa = ""; //Reset questions answers variable to empty so old Q/A don't stick around.
	jQuery('.matter_form_element_form_case_specific').first().children().each(function(){
		/*
		The class matter_form_element_form_case_specific is for the div tag that holds all the case questions.
		This runs through all the children and runs through any children they have as well.
		*/
		matthew_recursive(jQuery(this));
	});
	
  //The resulting matthew_qa has all questions even if there wasn't an answer
	//Remove questions without answers. By spliting into array and deleting items without a ":".
	var split_lines = "";
	split_lines = matthew_qa.split('\n');
	matthew_qa = "";
	var q_num = 1;
	for(var i=0;i<split_lines.length;i++){
		if (split_lines[i].indexOf(':') > -1){
			//Means this question does have an answer so we need to re add it to a single string.
			matthew_qa += "(" + String(q_num) + ")" + split_lines[i] + "\n";
			q_num += 1;
		}
	}
	jQuery('#'+matthew_grab_id_for_selector('label','All Case Questions')).val(""); //Delete whats in the All Questions Box
	jQuery('#'+matthew_grab_id_for_selector('label','All Case Questions')).val(matthew_qa); //Populate the All Questions Box
}

function matthew_recursive(element){
	/*
	This is a recursive function to cycle through all the children
	of the case questions div tag to grab all the questions. We have 
	to do it this way because the questions/answers can be buried in mulitple
	layers of tables or other tags.
	*/
	element.children().each(function () {
		var id_input = "";
		var question = "";
		var answer = "";
		if(jQuery(this).hasClass('form_label')){
			//Means this is a question so we add it to the global variable matthew_qa
			matthew_qa += "\n" + jQuery(this).text();
		}
		if(jQuery(this).prop("tagName") == 'LABEL'){
			//Need to grab the for attr then grab the value
			id_input = jQuery(this).attr('for');
			var temp_element = jQuery('#' + id_input);
			//Need to have seperate if statements depending on if it's a dropdown/text area/text input
			//Note it adds a colon to seperate between the Q and A. We later delete the questions without answers based on this.
			if(temp_element.prop("tagName") == "TEXTAREA" || (temp_element.prop("tagName") == "INPUT" && temp_element.attr("type") == 'text')){
				if(temp_element.val() != ""){
					matthew_qa += ":" + temp_element.val();
				}
			}else if(temp_element.prop("tagName") == "INPUT" && temp_element.attr("type") == 'radio'){
				if(temp_element.is(':checked')){
					matthew_qa += ":" + jQuery(this).text(); //The value of the input tag has the Yes/No not the radio input button.
				}
			}else if(temp_element.prop("tagName") == "SELECT"){
				if(jQuery('#' + id_input + ' option:selected').text() != "Please Select" && jQuery('#' + id_input + ' option:selected').text() != ""){
					matthew_qa += ":" + jQuery('#' + id_input + ' option:selected').text();
				}
			}
		}
		matthew_recursive(jQuery(this)); //Re run the function with the element to see if it has any children.
	});
	return null;
}
function matthew_grab_id_for_selector(etype,textlookingfor){
	/*
	This is the jQuery version which will grab the 'for' attribute
	from a label which is usually the id for the field with the value.
	*/
	var caseid = null;
	jQuery(etype).each(function(i){
		if(jQuery(this).text() == textlookingfor){
			caseid = jQuery(this).attr('for'); //Set the case id value outside of this anon function.
			console.log("Field ID: " + jQuery(this).attr('for'));
			return false;
		}
	});
	return caseid;
}
</script>
