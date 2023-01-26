import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper';
import { Text } from 'react-native-paper';
import { queryBlocs } from './hooks/queryBlocs'
import React from "react";
import { List } from 'react-native-paper';




export default function HomeScreen({ navigation }) {
/*     const [modalVisible, setModalVisible] = useState(false);
    const [region, setRegion] = useState("European Union"); */
    const {error, loading, data} = queryBlocs()

    

    const BlocItem = ({ bloc }) => {
      
      return (
        <PaperProvider>

{/*             <List.Item onPress={() => {setModalVisible(true); setRegion(bloc);}}/> */}
            <List.Item onPress={() => navigation.navigate("Countries", { region: bloc, title: bloc})}
              title={bloc}
              //description="Item description"
              left={props => <List.Icon {...props} icon="folder" />}
            />
            <StatusBar style="auto" />
        </PaperProvider>

      );
      
    };

    if (loading) {
        return <Text>Fetching data...</Text> //while loading return this
    }

    if (error) {
        return <Text>Something went wrong...</Text> //if query gives an error return this
    }

    return (
        <SafeAreaView>
          <FlatList
            data={data.regionalBlocs.edges}
            renderItem={({ item }) => <BlocItem bloc={item.node.name} />}
            keyExtractor={(item) => item.node.id}
          />
{/*           <CountriesScreen region={region} modalVisible={modalVisible} setModalVisible={setModalVisible}/> */}
        </SafeAreaView>
    );
  }

/* 
npx expo start 

PS fix web not starting
$env:NODE_OPTIONS = "--openssl-legacy-provider"

*/