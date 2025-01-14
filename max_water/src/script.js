// Initialize variables
console.log("hello world");
let heights = localStorage.getItem("heights") ? JSON.parse(localStorage.getItem("heights")) : [];
let maxi = heights.length > 0 ? Math.max(...heights) : 0;

function buildGraph() {
    // Clear and show current heights array
    document.getElementById("inputArea").innerHTML = ``;
    const arrayDisplay = document.createElement("div");
    arrayDisplay.textContent = `[${heights.join(", ")}]`;
    arrayDisplay.classList.add("mb-4", "text-center");
    inputArea.appendChild(arrayDisplay);

    // Create the graph container
    const graph = document.createElement("div");
    graph.classList.add("flex", "gap-1", "w-full", "h-full", "rounded-xl", "bg-slate-800", "p-4", "items-end", "mb-2");

    // Create and append bars with initial height of 0
    heights.forEach((e) => {
        const bar = document.createElement("div");

        // Initial height set to 0 for transition
        bar.style.height = '0%';
        bar.style.width = `${100 / heights.length}%`;

        // Add attractive styles to the bar
        bar.classList.add("bg-green-500", "rounded-lg", "transition-all", "duration-300");
        bar.style.transition = "height 0.8s ease"; // Smooth transition for height
        bar.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

        // Append the bar to the graph
        graph.appendChild(bar);

        // Set the final height after a delay for the transition effect
        setTimeout(() => {
            const barHeight = (e / maxi) * 100;
            bar.style.height = `${barHeight}%`;
        }, 50); // Small delay to ensure the transition is visible
    });

    // Append the graph to the display area
    document.getElementById("inputArea").appendChild(graph);
}

function buildWaterGraph(waterLevels, water) {
    // Clear the input area first
    const outputArea = document.getElementById("outputArea");
    outputArea.innerHTML = '';
    const waterDisplay = document.createElement("div");
    waterDisplay.textContent = `Water trapped: ${water} units`;
    waterDisplay.classList.add("mb-4", "text-center");
    outputArea.appendChild(waterDisplay);

    console.log(heights);
    if (heights.length === 0) return;

    // Create the graph container once
    const graph = document.createElement("div");
    graph.classList.add("flex", "gap-1", "w-full", "h-full", "rounded-xl", "bg-slate-800", "p-4", "items-end");

    // Create bars with water on top
    heights.map((height, index) => {
        const cont = document.createElement("div");
        cont.style.height = `100%`;
        cont.style.width = `${100 / heights.length}%`;
        cont.classList.add("justify-end", "flex", "flex-col");

        // Initial height set to 0 for transition
        const bar = document.createElement("div");
        bar.style.height = '0%';
        bar.style.width = `100%`;
        bar.classList.add("bg-green-500", "rounded-lg", "transition-all", "duration-500");
        bar.style.transition = "height 0.8s ease"; // Smooth transition for height
        bar.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

        // Set the final bar height after a delay for the transition effect
        setTimeout(() => {
            const barHeight = (height / maxi) * 100;
            bar.style.height = `${barHeight}%`;
        }, 50); // Small delay to ensure the transition is visible

        // Create the water part (on top of the bar)
        if (waterLevels[index] > 0) {
            const waterBar = document.createElement("div");
            waterBar.style.height = '0%';
            waterBar.style.width = "100%";
            waterBar.classList.add("bg-blue-500", "rounded-lg", "transition-all", "duration-300");
            waterBar.style.transition = "height 0.5s ease"; // Smooth transition for water height

            // Set the final water height after a delay for the transition effect
            setTimeout(() => {
                const waterHeight = (waterLevels[index] / maxi) * 100;
                waterBar.style.height = `${waterHeight}%`;
            }, 100); // Small delay to ensure the transition is visible

            cont.appendChild(waterBar);
        }

        cont.appendChild(bar);
        graph.appendChild(cont);
    });

    document.getElementById("outputArea").appendChild(graph);
}

function getWater() {
    if (heights.length < 3) {
        alert("Need at least 3 heights to calculate water!");
        return;
    }

    const n = heights.length;
    const waterLevels = new Array(n).fill(0);
    let water = 0;
    let left = 0;
    let right = n - 1;
    let leftMax = 0;
    let rightMax = 0;

    while (left < right) {
        if (heights[left] <= heights[right]) {
            if (heights[left] >= leftMax) {
                leftMax = heights[left];
            } else {
                const currentWater = leftMax - heights[left];
                water += currentWater;
                waterLevels[left] = currentWater;
            }
            left++;
        } else {
            if (heights[right] >= rightMax) {
                rightMax = heights[right];
            } else {
                const currentWater = rightMax - heights[right];
                water += currentWater;
                waterLevels[right] = currentWater;
            }
            right--;
        }
    }

    buildWaterGraph(waterLevels, water);
}


function getHeight() {
    const input = document.getElementById("inputBox").value.trim();
    if (!input) {
        alert("Please enter heights!");
        return;
    }

    const newHeights = input.split(" ").map(Number);

    if (newHeights.some(isNaN)) {
        alert("Please enter valid numbers!");
        return;
    }

    heights = newHeights;
    maxi = Math.max(...heights);
    localStorage.setItem("heights", JSON.stringify(heights));

    document.getElementById("inputBox").value = '';
    document.getElementById("outputArea").textContent = '';

    buildGraph();
    getWater();
}

// Initialize on page load
if (heights.length > 0) {
    buildGraph();
    getWater();
}
else {
    document.getElementById("inputArea").textContent = 'No Data';
    document.getElementById("outputArea").textContent = 'No Data';
}

const refresh = () => {
    localStorage.removeItem("heights");
    window.location.reload();
}