l = []
ll = []
meetOccupied = []
def main():
    tc = int(raw_input("no of test cases: "))
    for i in range(tc):
        val = map(int, raw_input("enter start and end time: ").split())
        ll.append({
            "diff": abs(val[0]-val[1]),
            "start": val[0],
            "end": val[1]
        })
        l.append(val)
    #print ll
    sort(ll)

def sort(ll):
    ll = sorted(ll, key=lambda k: (k['diff'], k["start"]))
    #print ll
    val = []
    for meet in ll:
        if not len(meetOccupied):
            meetOccupied.append(meet)
        else:
            val = filter(lambda x: (meet["start"]<= x["start"] and meet["end"]>=x["end"]), meetOccupied)
            if not len(val):
                meetOccupied.append(meet)
    print("require output: ",meetOccupied)

main()
