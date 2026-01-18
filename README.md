 📱 Task Manager  React Native Mobile Application
  Note : For Demo video app Refer Appdemovideo.mp4 file in repo
 🌟 Overview

A featurerich, crossplatform task management mobile application built with React Native and TypeScript. This app helps users organize their daily tasks with calendar integration, categorybased filtering, and visual analytics to track productivity.



 ✨ Features

 📋 Task Management
 ✅ Create, view, and manage tasks with intuitive UI
 ✅ Mark tasks as complete/incomplete with single tap
 ✅ Categorybased organization (Work, Personal, Birthday)
 ✅ Datespecific task scheduling
 ✅ Realtime filtering (All, Pending, Completed)

 📅 Calendar Integration
 ✅ Interactive monthly calendar view
 ✅ Visual task indicators on calendar dates
 ✅ Smooth month navigation with animations
 ✅ Quick task creation from selected dates
 ✅ Longpress gesture to navigate to task details

 📊 Analytics Dashboard
 ✅ Weekly task completion statistics
 ✅ Custom bar charts showing daily productivity
 ✅ Categorywise task breakdown
 ✅ Completed vs Pending task counters
 ✅ Current week summary

 🎨 User Experience
 ✅ Clean and modern Material Design UI
 ✅ Smooth animations and transitions
 ✅ Custom bottom tab navigation
 ✅ Floating Action Button for quick access
 ✅ Empty state handling with friendly messages
 ✅ Responsive layout with Flexbox



 🛠️ Tech Stack

 Frontend Framework
 React Native 0.72+
 TypeScript
 React Navigation v6

 State Management
 React Context API
 Custom Hooks (useTasks)

 Storage
 AsyncStorage for persistent local data

 UI Components
 React Native Paper (Material Design)
 Custom components
 Animated API for smooth transitions



 📁 Project Structure
 
TaskManagerApp/
│
├── App.tsx                  Main entry point
├── WelcomeScreen.tsx        Splash screen with autonavigation
├── MainTabs.tsx             Bottom tab navigation
│
├── TaskContext.tsx          Global state management
│
├── TaskListScreen.tsx       Main task management screen
├── CalendarScreen.tsx       Interactive calendar view
├── MineScreen.tsx           Analytics dashboard
│
├── AuthContext.tsx          Authentication context (future use)
└── EditTaskScreen.tsx       Task editing functionality
```



 Key Technical Implementations

 1. Context API for State Management
 Global task state accessible across all screens
 Custom `useTasks()` hook for easy consumption
 Automatic persistence with AsyncStorage

 2. Custom Calendar Logic
 Dynamic month grid generation
 First day calculation for proper alignment
 Datebased task filtering and display
 Timezonesafe date parsing

 3. Advanced React Hooks
```typescript
useState     Local component state
useEffect    Side effects & data loading
useContext   Global state consumption
useRef       Animation value persistence
```

 4. Navigation Patterns
 Stack Navigator for screen hierarchy
 Tab Navigator for main app sections
 Parameter passing between screens
 Custom tab bar with active state styling

 5. Performance Optimizations
 FlatList with keyExtractor for efficient rendering
 Cleanup functions to prevent memory leaks
 useNativeDriver for 60fps animations
 Conditional rendering for empty states

 6. Data Visualization
 Custom bar chart implementation
 Dynamic height calculations based on max value
 Weekly aggregation logic
 Categorywise grouping



 Screenshots

 
<img width="720" height="1600" alt="image" src="https://github.com/user-attachments/assets/bbd5f284-8e60-43a2-9320-69884b70ebe3" />
<img width="720" height="1600" alt="image" src="https://github.com/user-attachments/assets/75e0874c-0a67-467e-b386-d6ff48bea9f6" />
<img width="720" height="1600" alt="image" src="https://github.com/user-attachments/assets/8a085b9b-136c-44ae-9a51-b8785ee967a9" />
<img width="720" height="1903" alt="image" src="https://github.com/user-attachments/assets/a61ed1c6-9637-43b9-ab0a-095cdfb3ad05" />


Video







 🎯 Learning Outcomes

This project demonstrates proficiency in:

✅ React Native Development  Crossplatform mobile app creation  
✅ TypeScript  Typesafe JavaScript for better code quality  
✅ State Management  Context API with custom hooks  
✅ Navigation  Complex navigation patterns  
✅ Animations  Smooth UI transitions  
✅ Data Persistence  Local storage implementation  
✅ Date/Time Logic  Calendar calculations and formatting  
✅ Array Manipulation  Advanced filtering, sorting, mapping  
✅ Component Design  Reusable, modular architecture  
✅ Performance  Optimization techniques for smooth UX  



 🔧 Installation & Setup

 Prerequisites
 Node.js (v14 or higher)
 npm or yarn
 React Native CLI
 Android Studio / Xcode (for emulator)

 Steps

```bash
 Clone the repository
git clone https://github.com/Allekarthik/TaskManagerApp.git

 Navigate to project directory
cd TaskManagerApp

 Install dependencies
npm install

 Install iOS dependencies (Mac only)
cd ios && pod install && cd ..

 Run on Android
npx reactnative runandroid

 Run on iOS (Mac only)
npx reactnative runios
```



 📦 Dependencies

```json
{
  "react": "18.2.0",
  "reactnative": "0.72.0",
  "reactnavigation": "^6.x",
  "@reactnavigation/native": "^6.x",
  "@reactnavigation/bottomtabs": "^6.x",
  "@reactnavigation/nativestack": "^6.x",
  "reactnativepaper": "^5.x",
  "@reactnativeasyncstorage/asyncstorage": "^1.x",
  "typescript": "^5.x"
}
```



 🎨 App Flow

```
App Launch
    ↓
Welcome Screen (3 sec splash)
    ↓
Main Tabs
    ↓
┌─────────┬──────────┬─────────┐
│  Tasks  │ Calendar │  Mine   │
└─────────┴──────────┴─────────┘
```



 🔥 Features in Detail

 Task Management
 Add Tasks: Simple input with category selection
 Toggle Completion: Tap to mark complete/incomplete
 Filter Options: View All, Pending, or Completed tasks
 Persistent Storage: Tasks saved locally on device

 Calendar View
 Monthly Display: Full calendar grid with task indicators
 Task Icons: Visual representation of tasks on dates
 Date Selection: Tap to view tasks for specific date
 Navigation: Smooth animated month transitions
 Quick Add: Longpress to add task for selected date

 Analytics Dashboard
 Weekly Stats: Completed vs Pending task counts
 Visual Charts: Bar graph showing daily completions
 Category Breakdown: Pending tasks grouped by type
 Summary Cards: Quick overview of weekly performance


 👨‍💻 Developer

Alle Karthik

 GitHub: [@Allekarthik](https://github.com/Allekarthik)
 Project: [TaskManagerApp](https://github.com/Allekarthik/TaskManagerApp)



 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/Allekarthik/TaskManagerApp/issues).

