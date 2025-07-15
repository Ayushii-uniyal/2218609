const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJheXVzaGl1bml5YWwuMjIwMTIyMzU1QGdlaHUuYWMuaW4iLCJleHAiOjE3NTI1NjEyMzAsImlhdCI6MTc1MjU2MDMzMCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjNlMjgwODMxLTA0NjItNDU4Ny1iMjliLTg1MzZiNjQ2OWI5MyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImF5dXNoaSB1bml5YWwiLCJzdWIiOiJlY2VmM2ZlMS1mZmQ4LTQ0MDgtOGQ3Mi03NTYzYmZlYmYwNmMifSwiZW1haWwiOiJheXVzaGl1bml5YWwuMjIwMTIyMzU1QGdlaHUuYWMuaW4iLCJuYW1lIjoiYXl1c2hpIHVuaXlhbCIsInJvbGxObyI6IjIyMTg2MDkiLCJhY2Nlc3NDb2RlIjoiUUFoRFVyIiwiY2xpZW50SUQiOiJlY2VmM2ZlMS1mZmQ4LTQ0MDgtOGQ3Mi03NTYzYmZlYmYwNmMiLCJjbGllbnRTZWNyZXQiOiJkYkVuR2NxTkNlWVNOYUhxIn0.6h0p9DQjoh6q90ZR1xp7yh75UUUzTe-PHAowEqUz2tA"; // Paste your token here

export async function Log(stack, level, packagee, message) {
  const stacks = ["frontend"];
  const levels = ["debug", "info", "warn", "error", "fatal"];
  const packages = ["api", "component", "hook", "page", "state", "style", "auth", "config", "middleware", "utils"];

  if (!stacks.includes(stack.toLowerCase()) || !levels.includes(level.toLowerCase()) || !packages.includes(packagee.toLowerCase())) {
    console.error("parameters of log are invalid");
    return;
  }

  const body = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: packagee.toLowerCase(),
    message: message
  };

  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`  
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      console.error("Log failed!! : ", response.statusText);
    } else {
      const data = await response.json();
      console.log("Log success :) : ", data.message);
    }
  } catch (e) {
    console.error("Log error : ", e);
  }
}
