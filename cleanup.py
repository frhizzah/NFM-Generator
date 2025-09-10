import os
import shutil

def cleanup():
    # Define the directories to clean
    dirs_to_clean = ['build', 'dist']
    spec_file = 'main.spec'

    # Remove 'build' and 'dist' directories if they exist
    for dir_name in dirs_to_clean:
        if os.path.exists(dir_name):
            shutil.rmtree(dir_name)
            print(f"Deleted {dir_name} folder.")

    # Remove the '.spec' file if it exists
    if os.path.exists(spec_file):
        os.remove(spec_file)
        print(f"Deleted {spec_file} file.")

if __name__ == "__main__":
    cleanup()
