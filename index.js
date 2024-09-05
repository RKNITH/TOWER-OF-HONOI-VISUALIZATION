let totalDisks;
let disks = [];
let delayTime = 500;
const rods = {
    1: document.getElementById('rod1'),
    2: document.getElementById('rod2'),
    3: document.getElementById('rod3')
};

// Create the disks and place them on the first rod
function createDisks() {
    clearRods(); // Clear the rods before placing the disks
    disks = [];

    // Create the disks and append them to the first rod
    for (let i = totalDisks; i >= 1; i--) {
        const disk = document.createElement('div');
        disk.classList.add('disk');
        disk.style.width = `${60 + i * 30}px`; // Disk size decreases as disk number increases
        disk.setAttribute('data-size', i);
        disk.style.bottom = `${(totalDisks - i) * 35}px`; // Adjust vertical position to stack disks
        disks.push(disk);
        rods[1].appendChild(disk); // Place all disks initially on the first rod
    }
}

// Clear all rods before resetting
function clearRods() {
    rods[1].innerHTML = ''; // Clear the first rod
    rods[2].innerHTML = ''; // Clear the second rod
    rods[3].innerHTML = ''; // Clear the third rod
}

// Recursive Tower of Hanoi solution with visualization
function moveTowerWithVisualization(n, fromRod, toRod, auxRod, callback) {
    if (n === 1) {
        setTimeout(() => {
            moveDisk(fromRod, toRod); // Move the top disk
            callback();
        }, delayTime);
        return;
    }

    moveTowerWithVisualization(n - 1, fromRod, auxRod, toRod, () => {
        setTimeout(() => {
            moveDisk(fromRod, toRod); // Move a disk and then call the rest of the recursive function
            moveTowerWithVisualization(n - 1, auxRod, toRod, fromRod, callback);
        }, delayTime);
    });
}

// Move the top disk from one rod to another
function moveDisk(fromRod, toRod) {
    const from = rods[fromRod];
    const to = rods[toRod];

    const disk = from.lastElementChild; // Get the top-most disk from the 'from' rod
    to.appendChild(disk); // Move the disk to the 'to' rod

    // Adjust disk positioning (to place it on top of the stack in the target rod)
    const diskHeight = to.children.length - 1;
    disk.style.bottom = `${diskHeight * 35}px`;
}

// Start solving the Tower of Hanoi
function startHanoi() {
    document.getElementById('message').textContent = 'Solving Tower of Hanoi...';
    document.getElementById('startButton').disabled = true; // Disable start button during the process

    const totalSteps = Math.pow(2, totalDisks) - 1;
    let stepCounter = 0;

    function updateMessage() {
        stepCounter++;
        if (stepCounter === totalSteps) {
            document.getElementById('message').textContent = 'Tower of Hanoi solved!';
        }
    }

    moveTowerWithVisualization(totalDisks, 1, 3, 2, updateMessage); // Start moving the disks
}

// Initialize the Tower of Hanoi with user input
function initialize() {
    totalDisks = parseInt(document.getElementById('discNumber').value); // Get number of disks
    delayTime = parseInt(document.getElementById('delayInput').value); // Get delay time for visualization

    if (totalDisks >= 1 && totalDisks <= 10) {
        createDisks(); // Create and place the disks on the first rod
        document.getElementById('message').textContent = `Disks initialized. Number of disks: ${totalDisks}`;
        document.getElementById('startButton').disabled = false; // Enable start button after initialization
    } else {
        document.getElementById('message').textContent = 'Please choose a number between 1 and 10.'; // Error message for invalid input
    }
}
