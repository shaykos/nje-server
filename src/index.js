import prompts from "prompts";
import { build } from "./utils.js";

const questions = [
    {
        type: 'text',
        name: 'name',
        message: 'Enter your project name',
        initial: "my-server",
        format: (val) => val.toLowerCase().split(" ").join("-")
    },
    // {
    //     type: 'confirm',
    //     name: 'ts',
    //     message: 'Support Typescript?',
    //     initial: true
    // },
    {
        type: 'multiselect',
        name: 'options',
        message: 'Select your preferred options',
        choices: [
            { title: 'MSSQL', value: 'SQL' },
            { title: 'MongoDB', value: 'MongoDB' },
            { title: 'Handelbars', value: 'Handelbars' }
        ]
    }
];

(async () => {
    const response = await prompts(questions);
    build(response);
})();



