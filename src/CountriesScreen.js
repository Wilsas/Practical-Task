
import { FlatList, View} from "react-native";
import { Text, Card, ActivityIndicator, Avatar } from "react-native-paper";
import { queryCountries } from "./hooks/queryCountry";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button } from 'react-native';
import { useState } from "react";
import { Provider as PaperProvider } from 'react-native-paper';


const CountryItem = ({ country }) => {

  return (
    <Card style={styles.card}>

    <Card.Title title={country.name} subtitle={country.nativeName} left={()=> <Avatar.Image size={48} source = {({uri: country.flag})}/>}/>
    <Card.Content>
    <Text variant="bodyMedium">Population: {country.population}</Text>
      <Text variant="bodyMedium">Languages: </Text>
      <FlatList 
        data = {country.languages.edges}
        renderItem={({ item }) => <Text style={padding=4 } variant="bodyMedium">{item.node.name}</Text>}
        keyExtractor={(item) => item.node.id}
        />
    </Card.Content>
  </Card>
  );
};


export default function CountriesScreen( {navigation, route}, cursor) {
  let bloc = route.params.region;

  const [animating, setAnimating] = useState(true);

  const { data, loading, error, fetchMore} = queryCountries(bloc, cursor, 20);

  if (loading) {
    console.log('Loading: ', loading)
    return <View style={styles.row}><ActivityIndicator size="large" /></View>;
  }
  if ( error ) {
    return <Text>Something went wrong...</Text>
  }

  const renderLoader = () => {
    if (loading === true) {
      console.log('renderLoading: ', loading)
    return (
      <View style={styles.row}><ActivityIndicator size="large" /></View>
    );
  }
  }

  const loadMore = () => {
    console.log('End Reached')
    
      console.log('loadMoreLoading: ', loading);
      <View style={styles.row}><ActivityIndicator size="large" /></View>
    
    if (data.regionalBlocs.edges[0].node.countrySet.pageInfo.hasNextPage){

      fetchMore({
        variables: {
          cursor: data.regionalBlocs.edges[0].node.countrySet.pageInfo.endCursor,
        },
        updateQuery: (prevResult, {fetchMoreResult}) => {
          fetchMoreResult.regionalBlocs.edges[0].node.countrySet.edges = [
            ...prevResult.regionalBlocs.edges[0].node.countrySet.edges,
            ...fetchMoreResult.regionalBlocs.edges[0].node.countrySet.edges
          ];
          return fetchMoreResult;
        }
      });
    }
  }

  const regions = (data.regionalBlocs.edges)
  const countries = (regions[0].node.countrySet.edges)
  const track = (regions[0].node.countrySet)

  return (
    <View style={styles.container}>

      <PaperProvider>
        <FlatList
          data={data.regionalBlocs.edges[0].node.countrySet.edges}
              renderItem={({ item }) => <CountryItem country={item.node} />}
              keyExtractor={(item) => item.node.id}
              ListFooterComponent={renderLoader}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
        />
      </PaperProvider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  card: {
    margin: 4,
  },
});