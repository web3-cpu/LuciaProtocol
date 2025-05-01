import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from datetime import datetime, timedelta
import logging

def visit_link(url, success_log, error_log):
    try:
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

        driver.get(url)
        
        driver.implicitly_wait(5)  

        page_title = driver.title
        
        success_log.append({
            'time': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'title': page_title
        })

        print(f"Visited {url} - Page title: {page_title}")

        driver.quit()
    except Exception as e:
        error_log.append({
            'time': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'error': str(e)
        })
        print(f"Error visiting {url}: {e}")


def generate_report(success_log, error_log, start_time, end_time):
    total_visits = len(success_log) + len(error_log)
    successful_visits = len(success_log)
    failed_visits = len(error_log)

    report = f"""
    === Selenium Bot Visit Report ===
    Report Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
    Script run from: {start_time.strftime('%Y-%m-%d %H:%M:%S')}
    Script completed at: {end_time.strftime('%Y-%m-%d %H:%M:%S')}
    
    Total visits: {total_visits}
    Successful visits: {successful_visits}
    Failed visits: {failed_visits}

    First visit: {success_log[0]['time'] if success_log else 'N/A'}
    Last visit: {success_log[-1]['time'] if success_log else 'N/A'}

    === Visit Details ===
    """

    # Log successful visits
    for log in success_log:
        report += f"Time: {log['time']} | Title: {log['title']}\n"
    
    # Log failed visits
    if failed_visits > 0:
        report += "\n=== Errors ===\n"
        for log in error_log:
            report += f"Time: {log['time']} | Error: {log['error']}\n"
    
    return report

def run_script():
    url = "https://www.example.com"  
    success_log = []  
    error_log = []   

    start_time = datetime.now()
    end_time = start_time + timedelta(weeks=2)

    
    while datetime.now() < end_time:
        visit_link(url, success_log, error_log) 
        
        
        time.sleep(5 * 60)  

   
    report = generate_report(success_log, error_log, start_time, end_time)
    
    
    print(report)

    
    with open("selenium_bot_report.txt", "w") as report_file:
        report_file.write(report)

    print("[INFO] Report generated and saved as 'selenium_bot_report.txt'.")

if __name__ == "__main__":
    run_script()
