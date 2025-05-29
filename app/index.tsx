import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';  // ajuste caminho conforme localização
 import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { useRouter } from 'expo-router'; // ✅ CORRETO

type Task = {
  id: number;
  title: string;
  done?: boolean;
};

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

export default function TaskList({ navigation }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
const router = useRouter();

  const fetchTasks = () => {
    axios.get<Task[]>('http://127.0.0.1:8000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  };



useFocusEffect(
  useCallback(() => {
    fetchTasks();
  }, [])
);


  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        ListEmptyComponent={<Text style={styles.emptyText}>Sem tarefas ainda 💖</Text>}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={[styles.taskTitle, item.done && styles.done]}>{item.title}</Text>
          </View>
        )}
        contentContainerStyle={tasks.length === 0 && { flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>router.push('/create')
}
      >
        <Text style={styles.addButtonText}>＋ Nova tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7F8', // rosa clarinho
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  taskItem: {
    backgroundColor: '#FFE4E6', // rosa suave
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#D6336C',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  taskTitle: {
    fontSize: 18,
    color: '#6D214F', // vinho suave
    fontWeight: '500',
  },
  done: {
    textDecorationLine: 'line-through',
    color: '#A88CA0',
  },
  emptyText: {
    fontSize: 20,
    color: '#A88CA0',
    fontStyle: 'italic',
  },
  addButton: {
    backgroundColor: '#D6336C',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#D6336C',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  
}
);
