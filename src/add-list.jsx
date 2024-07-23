import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Arrivy_Logo from './Arrivy_Logo.jpeg';
import Campaigns from './Campaigns.jpeg';
import './App.css';

const AddList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]); // New state for selected campaigns

  useEffect(() => {
    axios.get('http://localhost:5000/campaigns')
      .then(response => setCampaigns(response.data))
      .catch(error => console.error('Error fetching campaign data:', error));
  }, []);

  const CampaignButton = ({ isToggled, onClick }) => {
    return (
      <div className={`toggle-container ${isToggled ? 'on' : 'off'}`} onClick={onClick}>
        <div className="slider"></div>
      </div>
    );
  };
  
  const toggleButton = (index) => {
    setCampaigns(campaigns.map((campaign, i) => 
      i === index ? { ...campaign, toggled: !campaign.toggled } : campaign
    ));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectChange = (event, index) => {
    const { checked } = event.target;
    setSelected(prevSelected => 
      checked ? [...prevSelected, index] : prevSelected.filter(i => i !== index)
    );
  };

  const handleSelectAll = (event) => {
    const { checked } = event.target;
    setSelected(checked ? campaigns.map((_, index) => index) : []);
  };

  const handleToggleSelected = (status) => {
    setCampaigns(campaigns.map((campaign, index) => 
      selected.includes(index) ? { ...campaign, toggled: status } : campaign
    ));
    setSelected([]); // Clear selection after toggle
  };

  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.add_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="links-container">
        <div className="links">
          <a href="https://www.arrivy.com/help/" target="_blank" rel="noopener noreferrer">
            <img 
              src={Arrivy_Logo} 
              alt="Arrivy Logo" 
              className="arrivy-logo-size"
            />
          </a>
          <img 
            src={Campaigns} 
            alt="Campaigns" 
            className="campaigns-logo-size"
          />
        </div>
      </div>
      <div className="header">
        <Link to="/add-advertisement">
          <button className="add-advertisement-button">
            + Create Campaign
          </button>
        </Link>
        <input
          type="text"
          className="search-bar"
          placeholder="Search names"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {selected.length > 1 && (
          <>
            <button 
              className="toggle-selected-button" 
              onClick={() => handleToggleSelected(true)}
            >
              Turn On Selected
            </button>
            <button 
              className="toggle-selected-button" 
              onClick={() => handleToggleSelected(false)}
            >
              Turn Off Selected
            </button>
          </>
        )}
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll} 
                  checked={selected.length === campaigns.length} 
                />
              </th>
              <th>On/Off</th>
              <th>Add Name</th>
              <th>Start Date Time</th>
              <th>End Date Time</th>
              <th>Repeat Frequency</th>
              <th>Delivery</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Impressions</th>
              <th>Closed</th>
              <th>Interaction</th>
              <th>Primary Button Text</th>
              <th>Primary Button Click</th>
              <th>Secondary Button Text</th>
              <th>Secondary Button Click</th>
              <th>Reach</th>
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.map((campaign, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(index)}
                    onChange={(event) => handleSelectChange(event, index)}
                  />
                </td>
                <td>
                <CampaignButton
                    isToggled={campaign.toggled}
                    onClick={() => toggleButton(index)}
                  />
                </td>
                <td>{campaign.add_name}</td>
                <td>{campaign.starting_date_time}</td>
                <td>{campaign.ending_date_time}</td>
                <td>{campaign.repeat_frequency}</td>
                <td>{campaign.delivery}</td>
                <td>{campaign.created_at}</td>
                <td>{campaign.updated_at}</td>
                <td>{campaign.impressions}</td>
                <td>{campaign.closed}</td>
                <td>{campaign.interaction}</td>
                <td>{campaign.primary_button_text}</td>
                <td>{campaign.primary_button_click}</td>
                <td>{campaign.secondary_button_text}</td>
                <td>{campaign.secondary_button_click}</td>
                <td>{campaign.reach}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddList;
