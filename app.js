import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskList from './screens/TaskList';
import CreateTask from './screens/CreateTask';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen name="TaskList" component={TaskList} options={{ title: 'Tarefas' }} />
        <Stack.Screen name="CreateTask" component={CreateTask} options={{ title: 'Nova Tarefa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
