export async function Log(stack, level, packagee, message){
    const stacks = ["frontend"];
    const levels = ["debug", "info", "warn", "error", "fatal"];
    const packages = ["api", "component", "hook", "page", "state", "style", "auth", "config", "middleware", "utils"];
    if(!stacks.includes(stack.toLowerCase()) || !levels.includes(level.toLowerCase()) || !packages.includes(packagee.toLowerCase())){
        console.error("parameters of log are invalid");
        return;
    }

    const body = {
        stack: stack.toLowerCase(), 
        level: level.toLowerCase(),
        package: packagee.toLowerCase(),
        message: message
    };

    try{
        const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(body)
        });

        if(!response.ok){
            console.error("Log failed!! : ", response.statusText);
        }
        else{
            const data = await response.json();
            console.log("Log success :) : ", data.message);
        }
    }
    catch(e){
        console.error("Log error : ", e);
    }
}