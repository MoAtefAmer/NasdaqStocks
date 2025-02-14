import { Dimensions, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import { Card, Text } from 'react-native-paper';
import { useMemo } from 'react';

interface StockCardProps {
  ticker: string;
  name: string;
  primaryExchange: string;
}

const screenWidth = Dimensions.get('window').width;

const itemWidth = screenWidth / 2 - 20;

const StockCard = ({ ticker, name, primaryExchange }: StockCardProps) => {
  const cardStyle = useMemo(() => [styles.card, { width: itemWidth }], []);
  return (
    <Card style={cardStyle}>
      <Card.Title
        titleStyle={styles.titleStyle}
        subtitleStyle={styles.subtitleStyle}
        title={ticker}
        subtitle={primaryExchange}
      />
      <Card.Content>
        <Text
          style={styles.subtextColor}
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
  subtextColor: { color: theme.colors.onPrimary },

  card: {
    padding: 10,
    backgroundColor: theme.colors.primary,
    margin: 10,
    marginBottom: 20,
    height: 150,
  },
  titleStyle: {
    color: theme.colors.onPrimary,
    fontSize: 20,
    fontWeight: '500',
  },
  subtitleStyle: {
    color: theme.colors.logoColor,
    fontSize: 12,
    fontWeight: '800',
  },
  text: {
    color: theme.colors.onPrimary,
    fontSize: 16,
  },
});
