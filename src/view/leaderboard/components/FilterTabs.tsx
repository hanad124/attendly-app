import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type FilterOption = 'class' | 'semester' | 'department';

interface FilterTabsProps {
  onFilterChange: (filter: FilterOption) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('class');

  const handleFilterChange = (filter: FilterOption) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <View style={styles.container}>
      {(['class', 'semester', 'department'] as FilterOption[]).map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[styles.tab, activeFilter === filter && styles.activeTab]}
          onPress={() => handleFilterChange(filter)}
        >
          <Text style={[styles.tabText, activeFilter === filter && styles.activeTabText]}>
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 5,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#3b5998',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activeTabText: {
    color: 'white',
  },
});

export default FilterTabs;
