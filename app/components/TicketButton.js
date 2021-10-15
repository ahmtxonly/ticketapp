import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import _ from 'lodash';

import {useDispatch, useSelector} from 'react-redux';

import Assets from '@assets';
import {addTicket} from '@actions';

const TicketButton = ({item}) => {
  const dispatch = useDispatch();

  const {selectedTickets, user_balance, createTicket} =
    useSelector(state => state.ticket) || {};

  const ticketStyle = [
    styles.ticket,
    selectedTickets.includes(item) && styles.activeTicket,
  ];

  const textStyle = [
    styles.ticketText,
    selectedTickets.includes(item) && styles.activeTicketText,
  ];

  const clickHandler = () => {
    if (selectedTickets.includes(item)) {
      dispatch(addTicket(_.remove(selectedTickets, n => n !== item)));
    } else if (
      selectedTickets?.length + (createTicket ? 1 : 0) ===
      user_balance
    ) {
      return;
    } else {
      dispatch(addTicket(_.concat(selectedTickets, item)));
    }
  };

  return (
    <TouchableOpacity style={ticketStyle} onPress={() => clickHandler()}>
      <View style={styles.checkbox}>
        {selectedTickets.includes(item) && (
          <Image source={Assets.checkIcon} style={styles.icon} />
        )}
      </View>
      <Text style={textStyle}>{item}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ticket: {
    flex: 1,
    height: 48,
    backgroundColor: '#E4E3F5',
    borderRadius: 10,
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  activeTicket: {
    backgroundColor: '#7248DD',
  },
  ticketText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  activeTicketText: {
    color: '#fff',
  },
  checkbox: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    marginRight: 16,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 15,
    height: 10,
  },
});

export default TicketButton;
