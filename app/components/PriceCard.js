import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

import {decimalFormatter} from '@utils';

const PriceCard = () => {
  const {selectedTickets, user_balance, createTicket} =
    useSelector(state => state.ticket) || {};

  const priceCalculator = () => {
    if (selectedTickets?.length === user_balance) {
      return `${decimalFormatter(selectedTickets?.length * 40)}₺`;
    } else if (selectedTickets?.length < user_balance && createTicket) {
      return `${decimalFormatter((selectedTickets?.length + 1) * 40)}₺`;
    } else {
      return `${decimalFormatter(selectedTickets?.length * 40)}₺`;
    }
  };
  const ticketCountCalculator = () => {
    if (selectedTickets?.length === user_balance) {
      return selectedTickets?.length;
    } else if (selectedTickets?.length < user_balance && createTicket) {
      return selectedTickets?.length + 1;
    } else {
      return selectedTickets?.length;
    }
  };
  const buttonDisableHandler = () => {
    if (selectedTickets?.length) {
      return false;
    } else if (!selectedTickets?.length && createTicket) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <View style={styles.PriceCardContainer}>
      <View>
        <Text style={styles.totalPriceText}>Total Price</Text>
        <Text style={styles.priceText}>{priceCalculator()}</Text>
        <Text style={styles.ticketCountText}>
          {ticketCountCalculator()} Ticket
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.button,
            buttonDisableHandler() && styles.buttonDisable,
          ]}
          disabled={buttonDisableHandler()}>
          <Text style={styles.buttonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  PriceCardContainer: {
    backgroundColor: '#fff',
    height: 135,
    borderTopColor: '#D0D2D1',
    borderTopWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    height: 60,
    width: 135,
    backgroundColor: '#7248DD',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisable: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPriceText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 8,
  },
  priceText: {
    color: '#7248DD',
    fontSize: 24,
    fontWeight: '800',
  },
  ticketCountText: {
    color: '#C4C4C4',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});

export default PriceCard;
