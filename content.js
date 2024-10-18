let observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        for (let addedNode of mutation.addedNodes) {
            if (addedNode.nodeType === 3 || addedNode.nodeType === 1) {
                const tables = document.querySelectorAll('table.table-grey.table__orders.table');
                tables.forEach(table => {
                    const rows = table.querySelectorAll('tbody tr');
                    for (let index = 0; index < rows.length; index++) {
                        const row = rows[index];
                        if (row.className === '') {
                            const chargeCell = row.cells[3]?.querySelector('span');
                            const charge = parseFloat(chargeCell.innerText);
                            const cost = parseFloat(rows[index + 1].cells[1]?.innerText);
                            if (!isNaN(cost) && !isNaN(charge)) {
                                let profit = ((charge - cost) / cost) * 100;
                                if (!chargeCell.querySelector('.profit-info')) {
                                    if (isNaN(profit)) {
                                        continue;
                                    }
                                    const profitSpan = document.createElement('span');
                                    profitSpan.className = 'profit-info';
                                    profitSpan.style.display = 'block';
                                    if (profit === Infinity) {
                                        profitSpan.innerText = `∞ Infinity`;
                                        profitSpan.style.color = 'green';
                                    }
                                    else if (profit >= 0) {
                                        profitSpan.innerText = `+${profit.toFixed(1)}%`;
                                        profitSpan.style.color = 'green';
                                    }
                                    else {
                                        if(profit === -100) {
                                            profitSpan.innerText = `-100%`;
                                        }
                                        else {
                                            profitSpan.innerText = `${profit.toFixed(2)}%`;
                                        }
                                        profitSpan.style.color = 'red';
                                    }

                                    const br = document.createElement('br');
                                    chargeCell.appendChild(br);
                                    chargeCell.appendChild(profitSpan);
                                }
                            }
                        }
                    }
                });
            }
            else {
                console.log(addedNode.nodeType);
            }
        }
    }
});
observer.observe(document, { childList: true, subtree: true });