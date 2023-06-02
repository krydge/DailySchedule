import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import axios from 'axios'
//Tabs  Today AllTasks InComplete
export default function App() {
  const [todaytask, setTodayTask] = useState([])
  const [alltasks, setAllTask] = useState([])
  const [tab, setTab] = useState("Today")
  const baseUrl = "http://192.168.0.68:3000"
  useEffect(() => {
    getDaysTasks()
    getAllTasks()
  }, [])

  async function getDaysTasks() {
    let body = { "user": { "id": 0 } }
    let tasks = await axios.get(baseUrl + '/task', { params: { body } })
    setTodayTask(tasks.data)
  }
  async function getAllTasks() {
    let body = { "user": { "id": 0 } }
    let tasks = await axios.get(baseUrl + '/tasks', { params: { body } })
    setAllTask(tasks.data)
  }
  async function updateTask(task) {
    let body = {
      "user": { "id": 0 },
      "task": { "id": task.id }
    }
    let tasks = await axios.put(baseUrl + '/task', body)
    await getAllTasks()
    await getDaysTasks()
    setAllTask(tasks.data)
  }
  function TabSelect(e) {
    setTab(e)
  }
  console.log(tab)
  return (

    <View style={styles.container}>
      <View>
        <Pressable onPress={() => TabSelect("Today")} ><Text>Today</Text></Pressable>
        <Pressable onPress={() => TabSelect("AllTask")} ><Text>All</Text></Pressable>
        <Pressable onPress={() => TabSelect("InComplete")} ><Text>InComplete</Text></Pressable>
      </View>
      {tab == "Today" && <>
        <Text>Your Daily Schedule</Text>
        <Text>Tasks Due Today</Text>
        {todaytask && todaytask.map((task) => <View key={task.id} >
          <Text>{task.name}</Text>
          <Pressable onPress={() => updateTask(task)}>
            <Text>{task.completed ? "Completed" : "Not Complete"}</Text></Pressable>
        </View>)}
        <StatusBar style="auto" />
      </>
      }
      {tab == "AllTask" && <>
        <Text>All Tasks created</Text>
        {alltasks && alltasks.map((task) => <View key={task.id} >
          <Text>{task.name}</Text>
          <Pressable onPress={() => alert(task.completed)}>
            <Text>{task.completed ? "Completed" : "Not Complete"}</Text></Pressable>
        </View>)}
        <StatusBar style="auto" />
      </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
