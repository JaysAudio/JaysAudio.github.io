
document.addEventListener('DOMContentLoaded', (event) => {
    // Add event listener for file input
    document.getElementById('fileInput').addEventListener('change', handleFileSelect);

    // Get the average of all active headphones except targets
    function getAvgAll() {
        let v = activePhones.filter(p => !p.isTarget).map(p => getAvg(p));
        return avgCurves(v);
    }

    // Draw the average of all active headphones
    let avgAllBtn = document.querySelector("button#avg-all");

    avgAllBtn.addEventListener('click', function() {
        let avgAll = getAvgAll();
        let phone = {
            fileName: "Average of All SPLs",
            dispBrand: "Uploaded",
            dispName: "Average of All SPLs",
            isTarget: false,
            channels: [avgAll],
            activeCurves: [],
            id: getPhoneNumber(),
            offset: 0,
            norm: 0
        };

        addOrUpdatePhone(phone);

        if (!avgAllBtn.classList.contains("selected")) {
            showPhone(phone, false);
            avgAllBtn.classList.add("selected");
        } else {
            avgAllBtn.classList.remove("selected");
            removePhone(phone);
        }
        updatePaths(true);
    });
});

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            processFileContent(content);
        };
        reader.readAsText(file);
    }
}

function processFileContent(content) {
    const phoneData = parsePhoneData(content);
    addOrUpdatePhone(phoneData);
}

function parsePhoneData(content) {
    return {
        fileName: 'temporaryPhone',
        dispBrand: 'Temporary Brand',
        dispName: 'Temporary Name',
        isTarget: false,
        channels: [], // Parse actual channels from content
        activeCurves: [],
        id: getPhoneNumber(),
        offset: 0,
        norm: 0
    };
}

function addOrUpdatePhone(phone) {
    let existingPhone = activePhones.find(p => p.fileName === phone.fileName);

    if (existingPhone) {
        Object.assign(existingPhone, phone);
        console.log(`Phone ${phone.fileName} updated`);
    } else {
        activePhones.push(phone);
        console.log(`Phone ${phone.fileName} added`);
    }

    updatePhoneTable();
    updatePaths();
    return phone;
}

function updatePhoneTable() {
    let table = document.querySelector('.manageTable tbody');
    table.innerHTML = '';

    activePhones.forEach(phone => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${phone.fileName}</td>
            <td>${phone.dispBrand}</td>
            <td>${phone.dispName}</td>
            <td>${phone.isTarget ? 'Yes' : 'No'}</td>
            <td>${phone.id}</td>
            <td>${phone.offset}</td>
            <td>${phone.norm}</td>
        `;
        table.appendChild(row);
    });
}

function updatePaths(trigger) {
    clearLabels();
    let c = d3.merge(activePhones.map(p => p.activeCurves)),
        p = gpath.selectAll("path").data(c, d=>d.id);
    let t = p.join("path").attr("opacity", c=>c.p.hide?0:null)
        .classed("sample", c=>c.p.samp)
        .attr("stroke", getColor_AC).call(redrawLine)
        .filter(c=>c.p.isTarget)
        .attr("class", "target");
    if (targetDashed) t.style("stroke-dasharray", "6, 3");
    if (targetColorCustom) t.attr("stroke", targetColorCustom);
    if (ifURL && !trigger) addPhonesToUrl();
    if (stickyLabels) drawLabels();
}

function getPhoneNumber() {
    let pn = nextPhoneNumber();
    phoneNumber = pn + 1;
    nextPN = null;
    return pn;
}

// Other existing functions...
