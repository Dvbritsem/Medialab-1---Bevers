function runAI_Check() {
    let input = document.getElementById('concept_check').value;

    let output = []; 

    fetch('http://localhost:3000/check', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            input: input,
        })
    })
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.output.length; i++) {
            const dataObject = data.output[i];

            if (dataObject.text_generated_by_step_name == "summarize" || dataObject.text_generated_by_step_name == "enhance") {
                output.push({
                    label: dataObject.text_generated_by_step_name,
                    content: dataObject.contents[0]
                })
            }
            if (dataObject.text_generated_by_step_name == "input") {
                let topics = [];

                for (let j = 0; j < dataObject.labels.length; j++) {
                    let label = dataObject.labels[j];

                    if (label.type == "sentiment") {
                        output.push({
                            label: label.type,
                            content: label.span_text
                        })
                    } 
                    else {
                        topics.push(label.value);
                    }
                }

                output.push({
                    label: "topics",
                    content: topics
                })
            }
        }
    }).then(() => {
        showOutput_Check(output)
    });
}

function showOutput_Check(output) {
    console.log(output);

    stopAnimation();

    let checked_output_summary = document.getElementById("checked_output_summary");
    checked_output_summary.innerText = output[2].content.utterance;

    let checked_output_sentiments = document.getElementById("checked_output_sentiments");
    checked_output_sentiments.innerText = output[0].content;

    let checked_output_topics = document.getElementById("checked_output_topics");
    let topics_text = "";
    for (let o = 0; o < output[1].content.length; o++) {
        let output_topic = output[1].content[o];

        if (o == 0) {
            topics_text = topics_text + output_topic;
        } else {
            topics_text = topics_text + "- " + output_topic;
        }
    }

    checked_output_topics.innerText = topics_text;
}

function runAI_Improve() {
    let input = document.getElementById('concept_improve').value;

    let output = []; 

    fetch('http://localhost:3000/improve', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            input: input,
        })
    })
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.output.length; i++) {
            const dataObject = data.output[i];

            if (dataObject.text_generated_by_step_name == "summarize" || dataObject.text_generated_by_step_name == "enhance") {
                output.push({
                    label: dataObject.text_generated_by_step_name,
                    content: dataObject.contents[0]
                })
            }
            if (dataObject.text_generated_by_step_name == "input") {
                let topics = [];

                for (let j = 0; j < dataObject.labels.length; j++) {
                    let label = dataObject.labels[j];

                    if (label.type == "sentiment") {
                        output.push({
                            label: label.type,
                            content: label.span_text
                        })
                    } 
                    else {
                        topics.push(label.value);
                    }
                }

                output.push({
                    label: "topics",
                    content: topics
                })
            }
        }
    }).then(() => {
        showOutput_Improve(output)
    });
}

function showOutput_Improve(output) {
    stopAnimation();

    console.log(output);

    let improved_output = document.getElementById("improved_output");
    improved_output.innerText = output[0].content.utterance;
}