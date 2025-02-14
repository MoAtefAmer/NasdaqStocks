import { Dimensions, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import { Card, Text } from 'react-native-paper';

interface StockCardProps {
  ticker: string;
  name: string;
  primaryExchange: string;
}

const StockCard = (props: StockCardProps) => {
  const { ticker, name, primaryExchange } = props;
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth / 2 - 20;
  return (
    <Card style={[styles.card, { width: itemWidth }]}>
      <Card.Title
        titleStyle={styles.titleStyle}
        subtitleStyle={styles.subtitleStyle}
        title={ticker}
        subtitle={primaryExchange}
      />
      <Card.Content>
        <Text
          style={{ color: 'white' }}
          variant="bodySmall"
          numberOfLines={3}
          ellipsizeMode="tail">
          {name}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default StockCard;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: theme.colors.primary,
    margin: 10,
    marginBottom: 20,
    height: 150,
  },
  titleStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  subtitleStyle: {
    color: theme.colors.logoColor,
    fontSize: 12,
    fontWeight: '800',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
