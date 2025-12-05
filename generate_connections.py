#!/usr/bin/env python3
"""
LinkedIn Connections Synthetic Data Generator
Generates realistic LinkedIn connections CSV for a software engineer
Connection period: 2010 to 2025
"""

import csv
import random
from datetime import datetime, timedelta
from typing import List, Tuple

# Data pools for realistic names and companies
FIRST_NAMES = [
    # Male names
    "Michael", "David", "John", "James", "Robert", "Daniel", "Matthew", "Christopher",
    "Andrew", "Joshua", "Ryan", "Brian", "Kevin", "Thomas", "Justin", "Brandon",
    "Eric", "Steven", "Alexander", "Jonathan", "Nicholas", "Anthony", "Adam", "Mark",
    "Jason", "Paul", "Benjamin", "Samuel", "Nathan", "Jacob", "Tyler", "Aaron",
    "Kyle", "Sean", "Patrick", "Dylan", "Jordan", "Luke", "Connor", "Ethan",
    # Female names
    "Sarah", "Jennifer", "Emily", "Jessica", "Ashley", "Amanda", "Rachel", "Michelle",
    "Stephanie", "Lauren", "Elizabeth", "Nicole", "Rebecca", "Megan", "Samantha", "Katherine",
    "Alexandra", "Laura", "Natalie", "Hannah", "Olivia", "Emma", "Sophia", "Isabella",
    "Ava", "Abigail", "Madison", "Grace", "Victoria", "Lily", "Chloe", "Sophie",
    "Anna", "Claire", "Julia", "Caroline", "Maya", "Zoe", "Lucy", "Elena",
    # International names
    "Yuki", "Raj", "Priya", "Chen", "Wei", "Maria", "Carlos", "Ahmed", "Fatima",
    "Ivan", "Dmitri", "Anastasia", "Pierre", "Amelie", "Hans", "Ingrid", "Paolo",
]

LAST_NAMES = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
    "Rodriguez", "Martinez", "Hernandez", "Lopez", "Wilson", "Anderson", "Thomas", "Taylor",
    "Moore", "Jackson", "Martin", "Lee", "Thompson", "White", "Harris", "Clark",
    "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott",
    "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker",
    "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Phillips", "Evans",
    "Turner", "Collins", "Edwards", "Stewart", "Morris", "Murphy", "Cook", "Rogers",
    "Peterson", "Cooper", "Reed", "Bailey", "Bell", "Gomez", "Kelly", "Howard",
    "Ward", "Cox", "Diaz", "Richardson", "Wood", "Watson", "Brooks", "Bennett",
    "Gray", "James", "Reyes", "Cruz", "Hughes", "Price", "Myers", "Long",
]

# Tech companies by era and size
COMPANIES = {
    "faang": [
        "Google", "Meta", "Amazon", "Netflix", "Apple", "Microsoft",
    ],
    "big_tech": [
        "IBM", "Oracle", "Salesforce", "Adobe", "Intel", "Cisco", "VMware",
        "Dell Technologies", "HP Enterprise", "SAP", "Accenture",
    ],
    "unicorns": [
        "Stripe", "Databricks", "SpaceX", "Airbnb", "Uber", "Lyft", "DoorDash",
        "Instacart", "Robinhood", "Coinbase", "Discord", "Figma", "Notion",
        "Snowflake", "Datadog", "HashiCorp", "GitLab", "Confluent",
    ],
    "mid_stage": [
        "Atlassian", "Twilio", "Zoom", "Slack", "Dropbox", "Box", "Okta",
        "Auth0", "Elastic", "MongoDB", "Redis", "PagerDuty", "Splunk",
        "New Relic", "DataDog", "Sentry", "LaunchDarkly", "Segment",
    ],
    "startups": [
        "ScaleOps", "Forter", "Fireblocks", "Wiz", "Snyk", "monday.com",
        "Fiverr", "Lemonade", "Riskified", "Resident", "Vimeo", "Plaid",
        "Chime", "Affirm", "Brex", "Ramp", "Mercury", "Airtable", "Webflow",
    ],
    "consulting": [
        "Deloitte Digital", "Accenture", "McKinsey Digital", "BCG Digital Ventures",
        "Thoughtworks", "Cognizant", "Infosys", "Wipro", "TCS",
    ],
    "early_era": [  # Companies that were bigger 2010-2015
        "Yahoo", "AOL", "Nokia", "BlackBerry", "Motorola", "Sun Microsystems",
        "MySpace", "Friendster", "Digg", "StumbleUpon",
    ]
}

# Job titles progression for software engineer
JOB_TITLES_BY_SENIORITY = {
    "junior": [
        "Software Engineer", "Junior Software Engineer", "Associate Software Engineer",
        "Software Developer", "Junior Developer", "Web Developer", "Frontend Developer",
        "Backend Developer", "Full Stack Developer",
    ],
    "mid": [
        "Software Engineer", "Software Engineer II", "Software Developer",
        "Backend Engineer", "Frontend Engineer", "Full Stack Engineer",
        "Platform Engineer", "Systems Engineer", "DevOps Engineer",
    ],
    "senior": [
        "Senior Software Engineer", "Senior Backend Engineer", "Senior Frontend Engineer",
        "Senior Full Stack Engineer", "Lead Software Engineer", "Principal Engineer",
        "Staff Engineer", "Senior Platform Engineer", "Senior DevOps Engineer",
    ],
    "lead": [
        "Tech Lead", "Engineering Lead", "Lead Engineer", "Principal Engineer",
        "Staff Engineer", "Senior Staff Engineer", "Distinguished Engineer",
        "Engineering Manager", "Senior Engineering Manager",
    ],
    "executive": [
        "Director of Engineering", "Senior Director of Engineering",
        "VP of Engineering", "SVP of Engineering", "CTO", "Chief Technology Officer",
        "Head of Engineering", "VP of Product Engineering",
    ]
}

# Connection velocity by year (how many connections per month typically)
CONNECTION_VELOCITY = {
    2010: (2, 5),   # Starting career, fewer connections
    2011: (3, 7),
    2012: (4, 7),
    2013: (5, 9),
    2014: (5, 10),  # Mid-career ramp up
    2015: (6, 12),
    2016: (7, 14),
    2017: (8, 16),
    2018: (9, 18),  # Peak networking
    2019: (9, 18),
    2020: (6, 13),  # COVID slowdown
    2021: (8, 15),  # Recovery
    2022: (9, 17),
    2023: (10, 18),
    2024: (8, 15),
    2025: (6, 12),  # Year not complete
}

def generate_name() -> Tuple[str, str]:
    """Generate a random first and last name."""
    first = random.choice(FIRST_NAMES)
    last = random.choice(LAST_NAMES)
    return first, last

def generate_company(year: int) -> str:
    """Generate a company name appropriate for the year."""
    # Before 2015, higher chance of early era companies
    if year < 2015 and random.random() < 0.15:
        return random.choice(COMPANIES["early_era"])
    
    # Distribution based on company type
    rand = random.random()
    if rand < 0.15:  # 15% FAANG
        return random.choice(COMPANIES["faang"])
    elif rand < 0.30:  # 15% big tech
        return random.choice(COMPANIES["big_tech"])
    elif rand < 0.50:  # 20% unicorns (less common in early years)
        if year < 2015:
            return random.choice(COMPANIES["big_tech"] + COMPANIES["mid_stage"])
        return random.choice(COMPANIES["unicorns"])
    elif rand < 0.75:  # 25% mid-stage
        return random.choice(COMPANIES["mid_stage"])
    elif rand < 0.90:  # 15% startups
        return random.choice(COMPANIES["startups"])
    else:  # 10% consulting
        return random.choice(COMPANIES["consulting"])

def generate_job_title(year: int, connection_age: int) -> str:
    """
    Generate a job title based on year and how long they've been working.
    connection_age: years since 2010 (career progression indicator)
    """
    years_experience = year - 2010 + connection_age
    
    if years_experience < 3:
        return random.choice(JOB_TITLES_BY_SENIORITY["junior"])
    elif years_experience < 6:
        return random.choice(JOB_TITLES_BY_SENIORITY["mid"])
    elif years_experience < 10:
        return random.choice(JOB_TITLES_BY_SENIORITY["senior"])
    elif years_experience < 15:
        return random.choice(JOB_TITLES_BY_SENIORITY["lead"])
    else:
        # Mix of lead and executive
        if random.random() < 0.7:
            return random.choice(JOB_TITLES_BY_SENIORITY["lead"])
        else:
            return random.choice(JOB_TITLES_BY_SENIORITY["executive"])

def generate_linkedin_url(first_name: str, last_name: str) -> str:
    """Generate a LinkedIn profile URL."""
    # Various LinkedIn URL patterns
    patterns = [
        f"{first_name.lower()}{last_name.lower()}",
        f"{first_name.lower()}-{last_name.lower()}",
        f"{first_name.lower()}{last_name.lower()}{random.randint(1, 999)}",
        f"{first_name[0].lower()}{last_name.lower()}",
        f"{first_name.lower()}-{last_name.lower()}-{random.randint(10000000, 99999999)}",
    ]
    username = random.choice(patterns)
    return f"https://www.linkedin.com/in/{username}"

def generate_connections() -> List[dict]:
    """Generate the complete list of connections from 2010 to 2025."""
    connections = []
    start_date = datetime(2010, 1, 1)
    end_date = datetime(2025, 12, 5)  # Today
    
    current_date = start_date
    
    while current_date <= end_date:
        year = current_date.year
        
        # Determine how many connections this month
        min_conn, max_conn = CONNECTION_VELOCITY.get(year, (4, 10))
        connections_this_month = random.randint(min_conn, max_conn)
        
        # Generate connections for this month
        for _ in range(connections_this_month):
            # Random day in the month
            day = random.randint(1, 28)  # Safe for all months
            try:
                connection_date = datetime(year, current_date.month, day)
            except ValueError:
                connection_date = current_date
            
            # Skip future dates
            if connection_date > end_date:
                break
            
            first_name, last_name = generate_name()
            company = generate_company(year)
            
            # Connection age (how long they've been in industry)
            connection_age = random.randint(0, 10)
            job_title = generate_job_title(year, connection_age)
            
            linkedin_url = generate_linkedin_url(first_name, last_name)
            
            # Format date as LinkedIn does: "01 Dec 2025"
            formatted_date = connection_date.strftime("%d %b %Y")
            
            connection = {
                "First Name": first_name,
                "Last Name": last_name,
                "URL": linkedin_url,
                "Email Address": "",  # Usually empty in LinkedIn exports
                "Company": company,
                "Position": job_title,
                "Connected On": formatted_date
            }
            
            connections.append(connection)
        
        # Move to next month
        if current_date.month == 12:
            current_date = datetime(current_date.year + 1, 1, 1)
        else:
            current_date = datetime(current_date.year, current_date.month + 1, 1)
    
    # Sort by date
    connections.sort(key=lambda x: datetime.strptime(x["Connected On"], "%d %b %Y"))
    
    return connections

def save_to_csv(connections: List[dict], filename: str = "Connections.csv"):
    """Save connections to CSV file."""
    fieldnames = ["First Name", "Last Name", "URL", "Email Address", "Company", "Position", "Connected On"]
    
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(connections)
    
    print(f"✅ Generated {len(connections)} connections")
    print(f"📁 Saved to: {filename}")
    
    # Print some statistics
    years = {}
    companies = {}
    for conn in connections:
        date = datetime.strptime(conn["Connected On"], "%d %b %Y")
        year = date.year
        years[year] = years.get(year, 0) + 1
        company = conn["Company"]
        companies[company] = companies.get(company, 0) + 1
    
    print(f"\n📊 Statistics:")
    print(f"   Years covered: {min(years.keys())} - {max(years.keys())}")
    print(f"   Total companies: {len(companies)}")
    print(f"   Avg connections/year: {len(connections) / len(years):.1f}")
    print(f"\n🏆 Top 5 companies:")
    for company, count in sorted(companies.items(), key=lambda x: x[1], reverse=True)[:5]:
        print(f"   {company}: {count} connections")
    
    print(f"\n📅 Connections by year:")
    for year in sorted(years.keys()):
        print(f"   {year}: {years[year]} connections")

if __name__ == "__main__":
    print("🔄 Generating LinkedIn connections data...")
    print("   Profile: Software Engineer")
    print("   Period: 2010 - 2025")
    print()
    
    connections = generate_connections()
    save_to_csv(connections)
    
    print("\n✨ Done! You can now load this CSV into the LinkedIn Graph Explorer.")
