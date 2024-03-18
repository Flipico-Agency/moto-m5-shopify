document.addEventListener('DOMContentLoaded', function() {

    // Helper function to fetch data from the API and return as JSON
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error: ', error);
        }
    }

    // Function to populate select options
    function populateSelect(selectElement, optionsArray) {
        selectElement.innerHTML = optionsArray.map(option =>
            `<option value="${option.value}">${option.text}</option>`
        ).join('');
        selectElement.selectedIndex = 0;
    }

    // Function to fetch and populate tire widths
    async function fetchAndPopulateTireWidths() {
        const tireWidths = await fetchData('https://api.wheel-size.com/v2/by_tire/sw/?user_key=your-user-key');
        if (tireWidths) {
            populateSelect(document.getElementById('widths'), tireWidths.map(tw => ({ value: tw, text: tw })));
        }
    }

    // Event listener for when the 'widths' select is clicked
    document.getElementById('widths').addEventListener('click', function() {
        fetchAndPopulateTireWidths();
    });

    // You can create similar functions and event listeners for the other selects

});