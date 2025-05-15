export default defineNuxtPlugin(() => {
    return {
      provide: {
        dummyRiders: [
          { id: 1, name: 'John Doe', count: 5 },
          { id: 2, name: 'Jane Smith', count: 3 },
          { id: 3, name: 'Michael Brown', count: 7 },
        ],
        dummyDeliveries: [
          { 
            id: 1, 
            address: '123 Main St, City', 
            riderName: 'John Doe', 
            status: 'Pending', 
            price: 250, 
            requestTime: '10:30 AM', 
            pickupTime: '11:00 AM' 
          },
          { 
            id: 2, 
            address: '456 Oak Ave, Town', 
            riderName: 'Jane Smith', 
            status: 'Completed', 
            price: 180, 
            requestTime: '2:15 PM', 
            pickupTime: '2:45 PM' 
          },
          { 
            id: 3, 
            address: '789 Pine Rd, Village', 
            riderName: 'Michael Brown', 
            status: 'In Transit', 
            price: 320, 
            requestTime: '3:20 PM', 
            pickupTime: '3:45 PM' 
          },
        ]
      }
    }
  })
  